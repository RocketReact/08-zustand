import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { HydrationBoundary } from "@tanstack/react-query";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

interface TasksPageProps {
  params: Promise<{ slug: string[] }>;
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
