import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import type { CreateNote, Note } from "@/types/note";
import { useRouter } from "next/navigation";
import { useCreateNewNoteFormStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  //Create the new Note & save state to store Zustand
  const {
    title,
    content,
    tag,
    errors,
    isSubmitting,
    setSubmitting,
    resetForm,
    validateForm,
    draft,
    setDraft,
    clearDraft,
  } = useCreateNewNoteFormStore();

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

    try {
      await mutation.mutateAsync(noteData);
    } catch (error) {
      console.error("failed to create note", error);
    } finally {
      setSubmitting(false);
      clearDraft(draft);
    }
  };

  return (
    <form
      onChange={() => setDraft({ ...draft, title, content, tag })}
      onSubmit={handleSubmit}
      className={css.form}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        {errors.title && <div className={css.error}>{errors.title}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={(e) => setDraft({ ...draft, content: e.target.value })}
        />
        {errors.content && <div className={css.error}>{errors.content}</div>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={tag}
          onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <div className={css.error}>{errors.tag}</div>}
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
