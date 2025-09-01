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

type tagsUnionType = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface NoteFormZustandStore {
  title: string;
  content: string;
  tag: tagsUnionType;

  draft: {
    title: string;
    content: string;
    tag: string;
  };

  errors: {
    title?: string;
    content?: string;
    tag?: string;
  };

  isSubmitting: boolean;
  setErrors: (errors: NoteFormZustandStore["errors"]) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  validateForm: () => Promise<boolean>;
  setDraft: (draft: { title: string; content: string; tag: string }) => void;
  clearDraft: (draft: { title: string; content: string; tag: string }) => void;
}
