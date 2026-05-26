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
- ✅ GoHighLevel webhook integration (fully configured)
- ✅ Retell AI voice and chat agents (fully configured)

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

The contact form is fully connected to GoHighLevel. The webhook URL is configured in `components/ContactForm.tsx`. All form submissions, AI voice calls, and AI chat sessions route to GHL automatically.

### Retell AI Integration

The site uses three Retell AI agents:

- **Jessica - Web Voice** — handles voice calls initiated from the website form
- **Jessica - Phone Voice** — handles inbound calls to (567) 587-1549
- **Jessica - Chat** — handles chat sessions initiated from the website form

All agent configuration, prompts, and GHL workflow mappings are documented in the project reference doc in the root of this repo.

The Retell API is accessed via `/api/retell/route.ts`. Supported modes: `voice`, `text`, `chat_message`, `end_chat`.

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
│   ├── api/
│   │   └── retell/
│   │       └── route.ts        # Retell AI API handler (voice, chat, end_chat)
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage
│   ├── privacy/page.tsx        # Privacy Policy
│   ├── terms/page.tsx          # Terms of Service
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Hero.tsx                # Hero section
│   ├── PackageSelector.tsx     # Interactive package picker
│   ├── Features.tsx            # Feature pillars
│   ├── FAQ.tsx                 # FAQ accordion
│   ├── ContactForm.tsx         # A2P-compliant booking form + AI voice/chat
│   └── Footer.tsx              # Site footer
├── public/                     # Static assets (favicons, images)
└── package.json
```

## Key Sections

### Hero Section
- "Bin There, Done That" Guarantee messaging
- Veteran-owned badge
- CTA buttons

### Package Selector
- Standard packages (Studio/1-Bed, 2-Bedroom, 3-Bedroom, 4-5 Bedroom)
- Custom package builder with bin counter
- Real-time pricing display

### Features
- Veteran-Owned Precision pillar
- Eco-Friendly & Cardboard-Free pillar
- 3-step process explanation

### FAQ
- SEO-optimized natural language questions
- Accordion-style answers
- Targets "Where can I rent moving boxes in Lima, OH?" and similar queries

### Contact Form
Four tabs:
1. **Reserve Bins Now** — standard booking request with dates and package selection
2. **Custom Bin Order** — custom quote request with free-text details
3. **Talk to AI** — live voice call with Jessica AI agent via Retell
4. **Chat with AI** — live text chat with Jessica AI agent via Retell

All tabs include A2P SMS compliance checkboxes and send data to GoHighLevel via webhook.

### Legal Pages
- Privacy Policy with dynamic date
- Terms of Service with dynamic date
- Both pages import Header and Footer
- Root path navigation (href="/#contact")

## Deployment

### Vercel (Recommended)

1. Push code to GitHub (branch: main)
2. Vercel auto-deploys on every push to main

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
- Phone: (567) 320-0620
- Email: info@bintheretotes.com
