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

export const initialDraft: CreateNote = {
  title: "",
  content: "",
  tag: "",
};
export type NoteFormZustandStore = {
  draft: CreateNote;
  setDraft: (draft: CreateNote) => void;
  clearDraft: () => void;
};
