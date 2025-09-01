export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  tag: string;
}

export interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

const tagsList: string[] = [
  "All",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];
export default tagsList;

export interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}
export interface NoteFormZustandStore {
  title: string;
  content: string;
  tag: string;

  draft: NoteDraft;

  errors: {
    title?: string;
    content?: string;
    tag?: string;
  };
  updateField: (field: keyof NoteDraft, value: string) => void;

  isSubmitting: boolean;
  setErrors: (errors: NoteFormZustandStore["errors"]) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  validateForm: () => Promise<boolean>;

  //Draft methods
  setDraft: (draft: NoteDraft) => void;
  clearDraft: () => void;
  loadDraft: () => void;
  hasDraft: () => boolean;
}
