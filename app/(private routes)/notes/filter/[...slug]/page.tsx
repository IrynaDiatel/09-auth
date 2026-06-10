import type { Metadata } from "next";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;

  const filter = slug[0] === "all" ? "All" : slug[0];

  return {
    title: `${filter} notes | NoteHub`,
    description: `Notes filtered by ${filter}`,
    openGraph: {
      title: `${filter} notes | NoteHub`,
      description: `Notes filtered by ${filter}`,
      url: `/notes/filter/${slug.join("/")}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import Notes from "./Notes.client";
import type { NoteTag } from "@/types/note";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const selectedTag = slug[0] === "all" ? "" : (slug[0] as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", selectedTag, 1],
    queryFn: () => fetchNotes({ page: 1, search: "", tag: selectedTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={selectedTag} />
    </HydrationBoundary>
  );
}
