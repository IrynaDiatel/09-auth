import api from "./api";
import type { AxiosResponse } from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search: string;
  perPage?: number;
  tag?: string;
}

export const fetchNotes = async ({
  page,
  search,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag: tag || undefined },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export interface CreateNoteData {
  title: string;
  content: string;
  tag: Note["tag"];
}

export const createNote = async (
  noteData: CreateNoteData,
): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export interface RegisterData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>(`/auth/register`, data);
  return response.data;
};

export const login = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>(`/auth/login`, data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post(`/auth/logout`);
};

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<{ success: boolean }>(`/auth/session`);
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>(`/users/me`);
  return res.data;
};

export const updateMe = async (data: Partial<User>): Promise<User> => {
  const res = await api.patch<User>(`/users/me`, data);
  return res.data;
};

export default {};
