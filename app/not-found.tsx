import css from "./not-found.module.css";
import type { Metadata } from "next";
import { OPEN_GRAPH_IMAGE, SITE_DOMAIN } from "@/config/metadata";

export const metadata: Metadata = {
  title: "404 Not Found Page",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Not Found Page",
    description: "Sorry, the page you are looking for does not exist.",
    images: [
      {
        ...OPEN_GRAPH_IMAGE,
        alt: "Note Hub - Note Taking App",
        url: `${SITE_DOMAIN}/404_page_image.jpg`,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
