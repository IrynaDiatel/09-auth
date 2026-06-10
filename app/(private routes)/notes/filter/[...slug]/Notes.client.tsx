"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import css from "./notes.module.css";

interface NotesProps {
  tag?: string;
}

export default function Notes({ tag = "" }: NotesProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: (previousData) => previousData,
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearch(query);
    setPage(1);

    const params = new URLSearchParams();

    if (query) params.set("search", query);

    params.set("page", "1");

    router.push(`/notes?${params.toString()}`);
  }, 300);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const params = new URLSearchParams();

    if (search) params.set("search", search);

    params.set("page", String(newPage));

    router.push(`/notes?${params.toString()}`);
  };

  return (
    <div className={css.container}>
      <div className={css.topBar}>
        <h1 className={css.heading}>My Notes</h1>

        <div className={css.controls}>
          <SearchBox value={search} onSearch={handleSearch} />

          <Link href="/notes/action/create" className={css.addBtn}>
            + Add Note
          </Link>
        </div>
      </div>

      {isLoading && <p>Loading, please wait...</p>}

      {isError && (
        <p>Could not fetch the list of notes. {(error as Error).message}</p>
      )}

      {data && (
        <>
          <NoteList notes={data.notes} />

          {data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
