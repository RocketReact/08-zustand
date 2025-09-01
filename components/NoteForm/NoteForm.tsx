import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import type { CreateNote, Note } from "@/types/note";
import { useRef } from "react";
import type { NoteFormZustandStore } from "@/types/note";
import { create } from "zustand";
import { useRouter } from "next/navigation";

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must have min 3 characters")
    .max(50, "Title must have max 50 characters")
    .required("Required"),
  content: Yup.string().max(500, "Content must have max 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Required"),
});

const useNoteFormStore = create<NoteFormZustandStore>((set, get) => ({
  title: "",
  content: "",
  tag: "Todo",
  errors: {},
  isSubmitting: false,

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setTag: (tag) => set({ tag }),
  setErrors: (errors) => set({ errors }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  resetForm: () =>
    set({
      title: "",
      content: "",
      tag: "Todo",
      errors: {},
      isSubmitting: false,
    }),

  validateForm: async () => {
    const { title, content, tag } = get();
    const data = { title, content, tag };
    try {
      await ValidationSchema.validate(data, { abortEarly: false });
      set({ errors: {} });
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: NoteFormZustandStore["errors"] = {};
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof NoteFormZustandStore["errors"]] =
              err.message;
          }
        });
        set({ errors });
      }
      return false;
    }
  },
}));

export default function NoteForm() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    title,
    content,
    tag,
    errors,
    isSubmitting,
    setTitle,
    setContent,
    setTag,
    setSubmitting,
    resetForm,
    validateForm,
  } = useNoteFormStore();

  const mutation = useMutation<Note, Error, CreateNote>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      resetForm();
      router.back();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const isValid = await validateForm();
    if (!isValid) {
      setSubmitting(false);
      return;
    }

    const noteData: CreateNote = { title, content, tag };
    console.log("Sending data:", noteData);
    try {
      await mutation.mutateAsync(noteData);
    } catch (error) {
      console.error("failed to create note", error);
    } finally {
      setSubmitting(false);
    }
  };

  const router = useRouter();

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className={css.error}>{errors.title} </div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && <div className={css.error}>{errors.content} </div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value as typeof tag)}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <div className={css.error}>{errors.tag} </div>}
      </div>

      <div className={css.actions}>
        <button
          onClick={() => router.back()}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting || mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
