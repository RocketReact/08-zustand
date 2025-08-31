import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactNode } from "react";
import { OG_IMAGE, SITE_DOMAIN, SITE_NAME } from "@/config/metadata";

export const metadata: Metadata = {
  title: "Note Hub - Create and Organize Your Notes Fast & Easy",
  description:
    "Free online note-taking app. Create, edit, and organize your notes instantly with our fast and intuitive interface. Perfect for students, professionals, and anyone who needs quick note management.",
  openGraph: {
    title: "Note Hub - Fast Note Taking Website",
    description:
      "Create and organize your notes instantly with our intuitive note-taking platform. Add a tag to your note to find it quickly!",
    url: SITE_DOMAIN,
    images: [OG_IMAGE],
    type: "website",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-roboto",
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
        <body className={roboto.variable}>
          <Header />
          {children}
          {modal}
          <Footer />
        </body>
      </html>
    </TanStackProvider>
  );
}
