# Bin There Totes - Moving Bin Rentals

A modern, high-converting landing page for Bin There Totes, a veteran-owned reusable moving bin rental service in Lima, OH.

## Features

- ✅ Modern Next.js 14 with TypeScript
- ✅ Tailwind CSS for styling
- ✅ Lucide React icons
- ✅ Deep Navy Blue & Safety Orange color scheme
- ✅ Fully responsive design
- ✅ Interactive package selector with custom bin counter
- ✅ A2P-compliant contact form with SMS consent
- ✅ SEO-optimized FAQ section
- ✅ Dynamic legal pages (Privacy & Terms)
- ✅ Veteran-owned trust badges
- ✅ Ready for GoHighLevel webhook integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Configuration

### GoHighLevel Webhook Integration

To connect the contact form to GoHighLevel:

1. Open `components/ContactForm.tsx`
2. Replace `YOUR_GHL_WEBHOOK_URL_HERE` on line 33 with your actual GoHighLevel webhook URL
3. The form will automatically send booking requests to GHL

### Customizing for Other Locations

This site is built with Next.js dynamic routing in mind. To adapt for other cities:

1. Update geo-specific content in components (Lima, OH references)
2. Modify SEO metadata in `app/layout.tsx`
3. Update contact information in `components/Footer.tsx` and `components/Header.tsx`

### Color Customization

The color scheme is defined in `tailwind.config.js`:
- **Navy Blue**: `#0A1F44` (primary brand color)
- **Safety Orange**: `#FF6B35` (accent/CTA color)
- **Cool Grays**: Light backgrounds and borders

## Project Structure

```
bin-there-totes/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── privacy/page.tsx    # Privacy Policy
│   ├── terms/page.tsx      # Terms of Service
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── PackageSelector.tsx # Interactive package picker
│   ├── Features.tsx        # Feature pillars
│   ├── FAQ.tsx             # FAQ accordion
│   ├── ContactForm.tsx     # A2P-compliant booking form
│   └── Footer.tsx          # Site footer
├── public/                 # Static assets
└── package.json
```

## Key Sections

### Hero Section
- "Bin There, Done That" Guarantee messaging
- Veteran-owned badge
- CTA buttons
- Hero image from Unsplash

### Package Selector
- Standard packages (1-Bedroom, 2-Bedroom, 3-Bedroom)
- Custom package builder with bin counter
- Real-time pricing calculator

### Features
- Veteran-Owned Precision pillar
- Eco-Friendly & Cardboard-Free pillar
- 3-step process explanation

### FAQ
- SEO-optimized natural language questions
- Accordion-style answers
- Targets "Where can I rent moving boxes in Lima, OH?" and similar queries

### Contact Form
- A2P SMS compliance with two checkboxes:
  1. Terms & Privacy agreement (Required)
  2. SMS consent (Optional)
- GoHighLevel webhook integration ready
- Success/error state handling

### Legal Pages
- Privacy Policy with dynamic date
- Terms of Service with dynamic date
- Both pages import Header and Footer
- Root path navigation (href="/#contact")

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## License

© 2026 Bin There Totes. All rights reserved.

## Support

For questions or support, contact:
- Phone: (419) 555-1234
- Email: info@bintheretotes.com
