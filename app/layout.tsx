import type { Metadata } from "next";
import config from './config.json';
import "./globals.css";

export const metadata: Metadata = {
  title: config.identity.title,
  description: config.identity.greeting,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
