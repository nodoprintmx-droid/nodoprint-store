import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nodoprint — Impresión de Gran Formato y DTF en CDMX",
  description: "Cotiza y ordena impresión de lonas, viniles, DTF, stickers, banners y más en CDMX.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
