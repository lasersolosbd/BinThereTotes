import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bin There Totes - Reusable Moving Bin Rentals | Lima, OH',
  description: 'Veteran-owned, eco-friendly moving bin rentals in Lima, OH. Skip the cardboard chaos. Rent stackable plastic totes, pack, and we pick up. Join the Done That club!',
  keywords: 'moving bins Lima OH, plastic moving boxes, reusable moving totes, eco-friendly moving, veteran-owned moving supplies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
