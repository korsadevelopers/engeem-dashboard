import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENGEEM - Data Stream Status Dashboard",
  description: "Real-Time data runtime stream monitoring and management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
