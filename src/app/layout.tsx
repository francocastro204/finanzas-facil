import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/shared/Header";
import "./globals.css";
import { AuthProvider } from '@/providers/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finanzas Fácil - Gestiona tus finanzas personales",
  description: "Gestiona tus finanzas personales de manera inteligente con la regla 50/30/20. Simple, intuitivo y efectivo.",
  keywords: "finanzas personales, gestión financiera, ahorro, presupuesto, 50/30/20",
  authors: [{ name: "Finanzas Fácil" }],
  openGraph: {
    title: "Finanzas Fácil - Gestiona tus finanzas personales",
    description: "Gestiona tus finanzas personales de manera inteligente con la regla 50/30/20",
    type: "website",
    locale: "es_ES",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}
      >
        <AuthProvider>
          <Header />
          <main className="pt-[72px]">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;