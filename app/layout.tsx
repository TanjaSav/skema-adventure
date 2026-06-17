import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "SKEMA Adventure",
  description: "Interactive outdoor adventure game for kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <body className={`${firaCode.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}