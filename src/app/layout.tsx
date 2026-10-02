import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "African Global Business (AGB) | BTP, Infrastructures, Logistique, Import & Export",
  description: "African Global Business (AGB) est une entreprise multisectorielle intervenant dans le BTP, les infrastructures, la logistique, l'import-export, l'imprimerie et les fournitures. Basée à Conakry, Guinée.",
  keywords: [
    "African Global Business",
    "AGB",
    "BTP",
    "Construction",
    "Infrastructures",
    "Logistique",
    "Import Export",
    "Imprimerie",
    "Fournitures",
    "Conakry",
    "Guinée"
  ],
  robots: "index, follow",
  openGraph: {
    title: "African Global Business (AGB) | Entreprise multisectorielle",
    description: "BTP & construction, infrastructures, logistique, import-export, imprimerie et fournitures. Basée à Conakry, Guinée.",
    siteName: "African Global Business",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "African Global Business",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "African Global Business (AGB) | Entreprise multisectorielle",
    description: "BTP & construction, infrastructures, logistique, import-export, imprimerie et fournitures. Basée à Conakry, Guinée.",
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${oswald.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-bg-light text-text-main antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
