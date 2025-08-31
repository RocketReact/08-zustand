import css from "./Layout.module.css";
import { ReactNode } from "react";

interface NotesLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function NotesLayout({ children, sidebar }: NotesLayoutProps) {
  return (
    <section className={css.section}>
      <aside className={css.sidebar}> {sidebar} </aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
