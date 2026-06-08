import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thrivo — Weight Loss That Actually Works",
  description: "Honest pricing, real food logging, transparent billing. No fake coaches.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-dark">{children}</body>
    </html>
  );
}
