import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://bin-there-totes.vercel.app'),
  title: 'Bin There Totes - Reusable Moving Bin Rentals | Lima, OH',
  description: 'Veteran-owned, eco-friendly moving bin rentals in Lima, OH. Skip the cardboard chaos. Rent stackable plastic totes, pack, and we pick up. Join the Done That club!',
  keywords: 'moving bins Lima OH, plastic moving boxes, reusable moving totes, eco-friendly moving, veteran-owned moving supplies, commercial office moves',
  openGraph: {
    title: 'Bin There Totes - Reusable Moving Bin Rentals | Lima, OH',
    description: 'Veteran-owned, eco-friendly moving bin rentals in Lima, OH. Skip the cardboard chaos.',
    url: 'https://bin-there-totes.vercel.app',
    siteName: 'Bin There Totes',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": "Bin There Totes",
    "description": "Eco-friendly, sanitized plastic moving bin rentals in Lima and Allen County, Ohio.",
    "url": "https://bin-there-totes.vercel.app",
    "telephone": "+15678251714",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lima",
      "addressRegion": "OH",
      "postalCode": "45801",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "City", "name": "Lima" },
      { "@type": "City", "name": "Delphos" },
      { "@type": "City", "name": "Bluffton" },
      { "@type": "City", "name": "Wapakoneta" },
      { "@type": "County", "name": "Allen County" }
    ],
    "founder": {
      "@type": "Person",
      "name": "Mike Sheets"
    }
  };

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
        {/* LeadConnector Chat Widget — A2P Compliance: loaded in body for scraper detection */}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="69f7f8fa9b1858b5ee9d7e6a"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
