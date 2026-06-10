import api from "./api";
import { headers } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

function getCookieHeader() {
  const cookie = headers().get("cookie");
  return cookie || "";
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search,
  perPage = 12,
  tag,
}: {
  page: number;
  search: string;
  perPage?: number;
  tag?: string;
}): Promise<FetchNotesResponse> => {
  const cookie = getCookieHeader();

  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag: tag || undefined },
    headers: { cookie },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = getCookieHeader();
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: { cookie },
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookie = getCookieHeader();
  const res = await api.get<User>(`/users/me`, { headers: { cookie } });
  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  const cookie = getCookieHeader();
  const res = await api.get(`/auth/session`, { headers: { cookie } });
  return res.status === 200;
};

export default {};
