import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Rayforce | Precision Engineering & Electrical Solutions",
  description: "Ingeniería de precisión aplicada a cada componente. Suministros industriales para proyectos que demandan excelencia y durabilidad técnica.",
  keywords: "material eléctrico, herramientas, ferretería, Hermosillo, Sonora, Truper, interruptores, tableros eléctricos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </head>
      <body className="bg-surface font-body text-on-surface antialiased selection:bg-primary-container selection:text-primary min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
