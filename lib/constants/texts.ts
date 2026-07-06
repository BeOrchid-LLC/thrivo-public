import { liveUrl } from '@/lib/config/env';

export const SITE_NAME = 'Thrivo';

export const SEO_DETAILS = {
  title: {
    default: 'Thrivo — Weight loss without the nonsense',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Thrivo is an honest weight loss app: barcode food scanning across 160+ countries, macro and water tracking, progress charts, transparent pricing at $14.99/month, and a cancel button that actually works.',
  ogDesc:
    'Honest pricing. Real food logging. A cancel button that works. Thrivo helps you lose weight without the nonsense — free tier available, no credit card required.',
  metadataBase: new URL(liveUrl),
  alternates: { canonical: liveUrl },
  image: `${liveUrl}/og-image.png`,
  icons: '/favicon.png',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1 },
  },
  keywords: [
    'Thrivo',
    'weight loss app',
    'calorie tracker',
    'barcode food scanner',
    'macro tracking',
    'food logging',
    'transparent pricing',
  ],
  generator: 'Next.js',
  publisher: 'BeOrchid LLC',
  category: 'Health & Fitness',
  classification: 'Weight loss and nutrition tracking app',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cancellation Policy', href: '/cancellation-policy' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Nav links for the (legal) route group's header — swaps in for NAV_LINKS on those pages. */
export const LEGAL_NAV_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: '@getthrivo', href: 'https://x.com/getthrivo' },
  { label: '@thrivoapp', href: 'https://instagram.com/thrivoapp' },
] as const;

export const COPYRIGHT = `© ${new Date().getFullYear()} BeOrchid LLC · thrivo.fit`;
