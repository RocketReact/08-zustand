import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { createNote } from "@/lib/api";
import type { CreateNote, Note } from "@/types/note";
import { useActionState, useRef } from "react";

interface FormState {
  errors: {
    title?: string;
    content?: string;
    tag?: string;
  };
  success?: boolean;
}
const initialState: FormState = {
  errors: {},
};

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

async function validateFormData(formData: FormData): Promise<FormState> {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    tag: formData.get("tag") as string,
  };
  try {
    await ValidationSchema.validate(data, { abortEarly: false });
    return { errors: {} };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors: FormState["errors"] = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path as keyof FormState["errors"]] = err.message;
        }
      });
      return { errors };
    }
    return { errors: {} };
  }
}

export default function NoteForm() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const mutation = useMutation<Note, Error, CreateNote>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      formRef.current?.reset();
    },
  });

  async function formAction(
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const validation = await validateFormData(formData);
    if (Object.keys(validation.errors).length > 0) {
      return validation;
    }
    const noteData: CreateNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as
        | "Todo"
        | "Work"
        | "Personal"
        | "Meeting"
        | "Shopping",
    };

    try {
      await mutation.mutateAsync(noteData);
      return { errors: {}, success: true };
    } catch (error) {
      return { errors: { title: "Failed to create note" } };
    }
  }

  const [state, dispatch] = useActionState(formAction, initialState);

  const stateErrors = state.errors;

  return (
    <form ref={formRef} action={dispatch} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className={css.input} />
        {stateErrors.title && (
          <div className={css.error}>{stateErrors.title} </div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue=""
        />
        {stateErrors.content && (
          <div className={css.error}>{stateErrors.content} </div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {stateErrors.tag && <div className={css.error}>{stateErrors.tag} </div>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
