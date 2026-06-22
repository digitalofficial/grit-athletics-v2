import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grit Athletics | CrossFit & Fitness in Tucson, AZ",
  description:
    "Tucson's hardest-working gym. CrossFit, strength & conditioning, HIIT, personal training, and open gym. Start your free week today.",
  keywords: [
    "CrossFit Tucson",
    "gym Tucson AZ",
    "fitness Tucson",
    "strength conditioning",
    "HIIT classes",
    "personal training Tucson",
    "Grit Athletics",
  ],
  openGraph: {
    title: "Grit Athletics | CrossFit & Fitness in Tucson, AZ",
    description:
      "Tucson's hardest-working gym. CrossFit, strength & conditioning, HIIT, and more.",
    type: "website",
    locale: "en_US",
    siteName: "Grit Athletics",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ExerciseGym", "HealthClub"],
  name: "Grit Athletics",
  description:
    "Tucson's hardest-working gym offering CrossFit, strength & conditioning, HIIT, personal training, and open gym.",
  url: "https://www.gritathletics.com",
  telephone: "(520) 555-0147",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4201 E Speedway Blvd",
    addressLocality: "Tucson",
    addressRegion: "AZ",
    postalCode: "85712",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.2366,
    longitude: -110.9147,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "05:30",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "07:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "12:00",
    },
  ],
  priceRange: "$$",
  image: "https://www.gritathletics.com/og-image.jpg",
  sameAs: [
    "https://www.instagram.com/gritathletics",
    "https://www.facebook.com/gritathletics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void text-stark font-body antialiased">
        {children}
      </body>
    </html>
  );
}
