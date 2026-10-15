import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://na-spokojnie.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Na Spokojnie | Restauracja we Wrocławiu",
    template: "%s | Na Spokojnie",
  },
  description:
    "Na Spokojnie, restauracja przy Grota-Roweckiego 71 we Wrocławiu. Burgery, śniadania i swobodna atmosfera.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteUrl,
    siteName: "Na Spokojnie",
    title: "Na Spokojnie | Restauracja we Wrocławiu",
    description:
      "Dobre rzeczy, na spokojnie. Odwiedź restaurację Na Spokojnie przy Grota-Roweckiego 71 we Wrocławiu.",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Gourmet_Hamburger_%28Unsplash%29.jpg",
        width: 4592,
        height: 3448,
        alt: "Burger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Na Spokojnie | Restauracja we Wrocławiu",
    description: "Burgery, śniadania i swobodna atmosfera we Wrocławiu.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Na Spokojnie",
    servesCuisine: ["Burgery", "Śniadania"],
    priceRange: "20–40 zł",
    telephone: "+48577722263",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Grota-Roweckiego 71",
      postalCode: "52-218",
      addressLocality: "Wrocław",
      addressCountry: "PL",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "451",
    },
    url: siteUrl,
  };

  return (
    <html lang="pl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
