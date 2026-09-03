import { canonicalUrl } from '@/lib/config/env';
import { SEO_DETAILS, SITE_NAME } from '@/lib/constants/texts';

type JsonLdObject = Record<string, unknown>;

/** Organization schema for the site publisher. */
export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BeOrchid LLC',
    url: canonicalUrl,
    logo: `${canonicalUrl}/favicon.png`,
  };
}

/** WebSite schema for the public site. */
export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: canonicalUrl,
    description: SEO_DETAILS.description,
  };
}

/** MobileApplication schema for the Thrivo app (add store URLs at launch). */
export function mobileAppJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: SITE_NAME,
    operatingSystem: 'iOS, Android',
    applicationCategory: 'HealthApplication',
    description: SEO_DETAILS.description,
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier — barcode scanning and 7-day history, no credit card required.',
      },
      {
        '@type': 'Offer',
        price: '14.99',
        priceCurrency: 'USD',
        description: 'Premium — $14.99/month, 14-day trial, cancel in 2 taps.',
      },
    ],
  };
}

/** FAQPage schema — pass the FAQ entries when the FAQ section is built. */
export function faqJsonLd(faqs: { question: string; answer: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
