import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "@/components";
import { textFont } from "@/components/config/fonts";



export const metadata: Metadata = {
  title: "Sorteos Devtalles",
  description: "Aplicación de sorteos para miembros devtalles en Discord",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={textFont.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
