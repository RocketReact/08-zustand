import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { dehydrate } from "@tanstack/query-core";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { OG_IMAGE, SITE_DOMAIN, SITE_NAME } from "@/config/metadata";
import { notFound } from "next/navigation";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id).catch(() => null);

  if (!note) {
    notFound();
  }

  const title = `${SITE_NAME} - Note: ${note.title}`;
  const description = note?.content.slice(0, 30);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_DOMAIN}/notes/filter/${id}`,
      images: [OG_IMAGE],
      type: "article",
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
