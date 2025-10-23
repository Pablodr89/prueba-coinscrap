import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers/providers";

export const metadata: Metadata = {
  title: "Prueba Coinscrap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`antialiased`}>
        <h1 className="text-4xl text-orange-500 px-10 pt-5 font-bold mb-4">
          bankenzer
        </h1>
        <Providers>
          <main className="flex flex-col items-start bg-gray-100 self-stretch gap-4 p-20 w-full h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
