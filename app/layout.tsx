import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Dancing_Script } from "next/font/google";
import "./globals.css";

const SITE_TITLE = "Célestattoo | Lucy Dubois — Tatoueuse et artiste peintre à Thetford Mines";
const SITE_DESCRIPTION =
  "Découvrez l'univers de Lucy Dubois, artiste tatoueuse et peintre à Thetford Mines. Tatouages personnalisés, cover-ups, créations artistiques et œuvres originales.";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Used only for the small handwritten-style signature in the About section.
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "tatouage Thetford Mines",
    "tatoueuse Québec",
    "Lucy Dubois",
    "Célestattoo",
    "cover-up tatouage",
    "peinture artiste Thetford Mines",
    "tatouage personnalisé",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Célestattoo",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F1E7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${manrope.variable} ${dancingScript.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream font-body text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
