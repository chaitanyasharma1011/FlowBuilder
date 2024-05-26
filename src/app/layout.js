import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Flow Builder with Next.js",
  description: "Connect Chat Blocks with threads easily now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
