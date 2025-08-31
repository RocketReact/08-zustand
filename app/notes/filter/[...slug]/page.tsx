import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { Metadata } from "next";
import { OG_IMAGE, SITE_DOMAIN, SITE_NAME } from "@/config/metadata";

interface TasksPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: TasksPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "" : slug[0];

  const title = `${SITE_NAME} - ${tag === "All" ? "All notes" : `Notes filtered by ${slug}`}`;
  const description = `Browse your ${tag} notes and boost your productivity`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_DOMAIN}/notes/filter/${slug}`,
      images: [OG_IMAGE],
    },
  };
}

export default async function TasksPage({ params }: TasksPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "" : slug[0];
  const queryClient = new QueryClient();
  const search = "";
  const page = 1;
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        ...(tag && tag !== "All" ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
