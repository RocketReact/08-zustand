import * as Yup from "yup";
import { create } from "zustand";
import type { NoteFormZustandStore, NoteDraft } from "@/types/note";
import { persist } from "zustand/middleware";

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

export const useCreateNewNoteFormStore = create<NoteFormZustandStore>()(
  persist(
    (set, get) => ({
      title: "",
      content: "",
      tag: "Todo",
      errors: {},
      isSubmitting: false,
      draft: {
        title: "",
        content: "",
        tag: "Todo",
      },

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

      //Update fields
      updateField: (field, value) =>
        set((state) => ({
          [field]: value,
          draft: { ...state.draft, [field]: value },
        })),

      setDraft: (draft) => set({ draft }),
      clearDraft: () =>
        set({
          draft: { title: "", content: "", tag: "Todo" },
        }),

      //Load draft to input
      loadDraft: () => {
        const { draft } = get();
        set({
          title: draft.title,
          content: draft.content,
          tag: draft.tag || "Todo",
        });
      },

      // Has the draft value?
      hasDraft: () => {
        const { draft } = get();
        return !!(
          draft.title ||
          draft.content ||
          (draft.tag && draft.tag !== "Todo")
        );
      },

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
            return false;
          } else {
            set({ errors: { title: "Validation error occurred" } });
            return false;
          }
        }
      },
    }),
    {
      name: "draft",
      //Save to localStorage only draft
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
