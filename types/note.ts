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

  errors: {
    title?: string;
    content?: string;
    tag?: string;
  };

  isSubmitting: boolean;

  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTag: (tag: tagsUnionType) => void;
  setErrors: (errors: NoteFormZustandStore["errors"]) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  validateForm: () => Promise<boolean>;
}
