"use client";

import css from "./page.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
interface NotesClientProps {
  tag?: string;
}

function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const redirectToCreateNote = () => {
    router.push(`/notes/action/create`);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);
  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox onSearchChange={handleSearch} />
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <button onClick={redirectToCreateNote} className={css.button}>
            Create Note+
          </button>
        </div>
        {isSuccess && data && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
        {isPending && <div className={css.loading}>Loading...</div>}
      </div>
    </>
  );
}

export default NotesClient;
