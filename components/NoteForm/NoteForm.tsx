"use client";

import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";

import { createNote } from "../../services/noteService";
import type { NoteTag } from "../../types/note";

import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setDraft({
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(formData: FormData) {
    const note = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };

    await createNote(note);

    await queryClient.invalidateQueries({
      queryKey: ["notes"],
    });

    clearDraft();

    router.back();
  }

  return (
    <form action={handleSubmit} className={css.form}>
      {" "}
      <div className={css.formGroup}>
        {" "}
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          defaultValue={draft.title}
          onChange={handleChange}
          className={css.input}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          rows={8}
          defaultValue={draft.content}
          onChange={handleChange}
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          defaultValue={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
