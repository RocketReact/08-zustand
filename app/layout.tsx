import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Note Hub - Create and Organize Your Notes Fast & Easy",
  description:
    "Free online note-taking app. Create, edit, and organize your notes instantly with our fast and intuitive interface. Perfect for students, professionals, and anyone who needs quick note management.",
  openGraph: {
    title: "Note Hub - Fast Note Taking Website",
    description:
      "Create and organize your notes instantly with our intuitive note-taking platform.",
    url: "http://localhost:3000/",
    images: [
      {
        url: "http://localhost:3000/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub - Note Taking App",
      },
    ],
  },
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <TanStackProvider>
      <html lang="en">
        <body className={nunito.variable}>
          <Header />
          {children}
          {modal}
          <Footer />
        </body>
      </html>
    </TanStackProvider>
  );
}
