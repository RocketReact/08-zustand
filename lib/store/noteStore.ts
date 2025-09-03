import { create } from "zustand";
import { NoteFormZustandStore, initialDraft } from "@/types/note";
import { persist } from "zustand/middleware";

export const useCreateNewNoteFormStore = create<NoteFormZustandStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (draft) => set(() => ({ draft: draft })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "draft",
      //Save to localStorage only draft
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
