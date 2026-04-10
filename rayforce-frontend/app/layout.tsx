import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Rayforce — Material Eléctrico y Ferretería en Hermosillo",
  description: "Tienda en línea de material eléctrico, herramientas y ferretería. Más de 2,000 productos de marcas líderes como Truper, Square D y más. Envíos a todo Sonora.",
  keywords: "material eléctrico, herramientas, ferretería, Hermosillo, Sonora, Truper, interruptores, tableros eléctricos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
