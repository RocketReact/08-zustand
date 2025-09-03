"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import type { CreateNote } from "@/types/note";
import { useRouter } from "next/navigation";
import { useCreateNewNoteFormStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useCreateNewNoteFormStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/All");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as CreateNote;
    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/All");

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">
          Content
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
      <div className={css.formGroup}>
        <label htmlFor="id">
          Tag
          <select
            id="tag"
            name="tag"
            defaultValue={draft?.tag}
            onChange={handleChange}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </label>
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
        <button
          onClick={handleCancel}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
