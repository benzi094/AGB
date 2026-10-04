import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_URL,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_DESCRIPTION,
  SITE_LOGO_PATH,
  SITE_PHONE,
  SITE_EMAIL,
  SITE_HOURS,
  SOCIAL_LINKS,
} from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "African Global Business (AGB) | BTP et services en Guinée",
    template: "%s | African Global Business",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "African Global Business (AGB) | BTP et services en Guinée",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "African Global Business (AGB) | BTP et services en Guinée",
    description: SITE_DESCRIPTION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: SITE_SHORT_NAME,
      inLanguage: "fr",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: SITE_SHORT_NAME,
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}${SITE_LOGO_PATH}` },
      image: `${SITE_URL}${SITE_LOGO_PATH}`,
      description: SITE_DESCRIPTION,
      telephone: SITE_PHONE,
      email: SITE_EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Concasseur, Commune de Dixinn",
        addressLocality: "Conakry",
        addressCountry: "GN",
      },
      areaServed: { "@type": "Country", name: "Guinée" },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: SITE_HOURS.days,
          opens: SITE_HOURS.opens,
          closes: SITE_HOURS.closes,
        },
      ],
      knowsAbout: [
        "BTP et construction",
        "Infrastructures",
        "Logistique",
        "Import-export",
        "Imprimerie",
        "Fournitures",
      ],
      ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS.map((l) => l.url) } : {}),
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
