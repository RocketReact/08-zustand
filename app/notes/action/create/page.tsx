import CreateNoteClient from "./CreateNote.client";
import { HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { OG_IMAGE, SITE_DOMAIN } from "@/config/metadata";

export const metadata: Metadata = {
  title: "Create New Note",
  description:
    "Create a new note with title, content & tags - to organize your workflow",
  openGraph: {
    title: "Create New Note on a NoteNub",
    description:
      "Create a new note with title, content & tags - to organize your workflow",
    url: SITE_DOMAIN,
    images: [OG_IMAGE],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <HydrationBoundary state={undefined}>
      <CreateNoteClient />
    </HydrationBoundary>
  );
}
