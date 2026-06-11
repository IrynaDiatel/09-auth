import api from "./api";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
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
  const cookie = await getCookieHeader();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag: tag || undefined },
    headers: { Cookie: cookie },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = await getCookieHeader();
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookie },
  });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookie = await getCookieHeader();
  const res = await api.get<User>(`/users/me`, { headers: { Cookie: cookie } });
  return res.data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookie = await getCookieHeader();
  const res = await api.get(`/auth/session`, { headers: { Cookie: cookie } });
  return res;
};

export default {};
