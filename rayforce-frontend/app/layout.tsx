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
