import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bintheretotes.com'),
  title: 'Bin There Totes - Reusable Moving Bin Rentals | Lima, OH',
  description: 'Veteran-owned, eco-friendly moving bin rentals in Lima, OH. Skip the cardboard chaos. Rent stackable plastic totes, pack, and we pick up. Join the Done That club!',
  keywords: [
    'moving bins Lima OH',
    'moving boxes Lima OH',
    'plastic moving boxes',
    'reusable moving totes',
    'cardboard box alternatives',
    'moving dolly rental Lima OH',
    'eco-friendly moving',
    'veteran-owned moving supplies',
    'packing supplies Lima OH',
    'commercial office moves Lima OH',
    'water resistant moving containers',
    'heavy duty moving boxes Lima OH',
  ].join(', '),
  openGraph: {
    title: 'Bin There Totes - Reusable Moving Bin Rentals | Lima, OH',
    description: 'Veteran-owned, eco-friendly moving bin rentals in Lima, OH. Skip the cardboard chaos.',
    url: 'https://www.bintheretotes.com',
    siteName: 'Bin There Totes',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.bintheretotes.com/hero-bins.webp',
        width: 1200,
        height: 630,
        alt: 'Bin There Totes - Reusable Moving Bin Rentals in Lima, OH',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bin There Totes - Reusable Moving Bin Rentals | Lima, OH',
    description: 'Veteran-owned, eco-friendly moving bin rentals in Lima, OH. Skip the cardboard chaos.',
    images: ['https://www.bintheretotes.com/hero-bins.webp'],
  },
  alternates: {
    canonical: 'https://www.bintheretotes.com',
  },
  robots: {
    index: true,
    follow: true,
  },
icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
},
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RentalService"],
    "name": "Bin There Totes",
    "description": "Veteran-owned, eco-friendly reusable plastic moving bin and dolly rentals in Lima and Allen County, Ohio. Delivered and picked up on your schedule.",
    "url": "https://www.bintheretotes.com",
    "telephone": "+15673200620",
    "email": "info@bintheretotes.com",
    "image": "https://www.bintheretotes.com/hero-bins.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1401 N West St",
      "addressLocality": "Lima",
      "addressRegion": "OH",
      "postalCode": "45801",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7448,
      "longitude": -84.1052
    },
    "areaServed": [
      { "@type": "City", "name": "Lima", "sameAs": "https://en.wikipedia.org/wiki/Lima,_Ohio" },
      { "@type": "City", "name": "Delphos" },
      { "@type": "City", "name": "Bluffton" },
      { "@type": "City", "name": "Wapakoneta" },
      { "@type": "AdministrativeArea", "name": "Allen County", "addressRegion": "OH" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Moving Bin & Dolly Rental Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "1-Bedroom Moving Bin Rental",
            "description": "15 reusable plastic moving bins, delivered and picked up."
          },
          "price": "149.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "2-Bedroom Moving Bin Rental",
            "description": "35 reusable plastic moving bins, delivered and picked up."
          },
          "price": "229.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "3-Bedroom Moving Bin Rental",
            "description": "50 reusable plastic moving bins, delivered and picked up."
          },
          "price": "329.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "4-5 Bedroom Moving Bin Rental",
            "description": "75 reusable plastic moving bins, delivered and picked up."
          },
          "price": "429.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Moving Dolly Rental",
            "description": "Add-on dolly rental available with any bin package for easy loading and transport."
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Mike Sheets"
    },
    "foundingDate": "2024",
    "slogan": "Bin There, Done That",
    "sameAs": [
      "https://www.yelp.com/biz/bin-there-totes-lima"
    ]
  }

  return (
    <html lang="en">
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
