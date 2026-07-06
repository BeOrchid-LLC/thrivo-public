import type { LegalDocContent } from './types';

/**
 * Static legal copy — deliberately not routed through `lib/content/fetch-content.ts`
 * like the marketing sections in `app/_sections`. That seam exists for
 * CMS-editable short-form copy (docs/BUILD-NOTES.md rule 2); long-form legal
 * text is compliance-sensitive and changes rarely and deliberately, so it's
 * plain static data colocated with code instead.
 */
export const PRIVACY_POLICY_CONTENT: LegalDocContent = {
  title: 'Privacy Policy',
  subtitle: 'How BeOrchid LLC collects, uses, and protects your personal information in Thrivo',
  meta: [
    { label: 'Effective date', value: 'January 1, 2026' },
    { label: 'Company', value: 'BeOrchid LLC' },
    { label: 'Platform', value: 'Thrivo iOS & Android' },
    { label: 'Client', value: 'All Thrivo Users' },
  ],
  sections: [
    {
      id: 'information-we-collect',
      heading: 'Information we collect',
      callout: 'Your data is yours.',
      paragraphs: [
        'By using Thrivo you agree to the collection and use of information described here. This policy applies to every account tier — free and Premium — and to the data Thrivo needs to deliver the app experience. Your health data is never sold.',
      ],
      groups: [
        {
          icon: 'user',
          label: 'Account information',
          items: [
            'Email address — required for account creation and login',
            'Name (optional)',
            'Password (or a Google sign-in link, if you choose Google instead)',
          ],
        },
        {
          icon: 'activity',
          label: 'Health & fitness data',
          items: [
            'Body weight and daily calorie target',
            'Calorie intake and macro (protein, carbs, fat) targets and logs',
            'Foods you scan or search, and your food log history',
            'Daily water intake',
            'Progress data you enter, such as weight-trend check-ins',
          ],
        },
      ],
    },
    {
      id: 'how-we-use-your-information',
      heading: 'How we use your information',
      paragraphs: [
        'We use the information above to run the core Thrivo experience and nothing beyond that:',
      ],
      groups: [
        {
          icon: 'server',
          label: 'What it powers',
          items: [
            'Creating and securing your account, and signing you in',
            'Calculating your daily calorie and macro targets',
            'Storing your food log, water intake, and progress history so it syncs across devices',
            'Sending account-related email (sign-in codes, receipts, service notices)',
            'Processing your subscription and enforcing plan limits (Free vs. Premium)',
            'Diagnosing crashes and fixing bugs',
          ],
        },
      ],
    },
    {
      id: 'third-party-services',
      heading: 'Third-party services',
      paragraphs: [
        'Thrivo is built on a small number of vetted third-party services, each scoped to a specific job. We do not sell your data to any of them, and none of them can see your data outside the purpose listed below.',
      ],
      groups: [
        {
          icon: 'server',
          label: 'Infrastructure & data',
          items: [
            'Open Food Facts — the food database behind barcode scanning and food search (no account data is shared with it)',
            'Cloudflare R2 — optional object storage for uploaded images',
          ],
        },
        {
          icon: 'shield',
          label: 'Accounts & billing',
          items: [
            'Google — optional "Sign in with Google" (we only receive your email and name)',
            'RevenueCat — manages App Store / Google Play subscription status and receipts',
            'Resend — delivers sign-in codes and transactional email',
          ],
        },
        {
          icon: 'activity',
          label: 'Reliability & product',
          items: [
            'Sentry — crash and error reporting, so we can fix bugs quickly',
            'PostHog — aggregated, privacy-respecting product analytics (which features are used, not your food log contents)',
          ],
        },
      ],
    },
    {
      id: 'health-data',
      heading: 'Health data',
      callout: 'Treated as sensitive, always.',
      paragraphs: [
        'Weight, calorie targets, macro logs, and water intake are health information, and we treat them accordingly: encrypted at rest and in transit, restricted to the systems that need them to run the app, and never shared with advertisers or data brokers.',
        'We do not use your health data to train models for any purpose other than improving the specific feature that produced it (e.g. calorie estimation from a barcode scan), and we do not sell it, rent it, or trade it, under any circumstance.',
        'You can export or delete your food log and progress history at any time from Settings, or by contacting us — see Your rights below.',
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      paragraphs: ['Wherever you are, you can ask us to:'],
      groups: [
        {
          icon: 'user',
          label: 'You can request',
          items: [
            'Access — a copy of the personal data we hold about you',
            'Correction — fix inaccurate account or profile information',
            'Deletion — permanently delete your account and associated data',
            'Portability — export your food log and progress history',
            'Objection — opt out of non-essential analytics',
          ],
        },
      ],
    },
    {
      id: 'california-residents',
      heading: 'California residents',
      paragraphs: [
        'If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the CPRA, gives you the right to know what personal information we collect, request its deletion, and opt out of its "sale" or "sharing" — terms defined broadly under California law.',
        'BeOrchid LLC does not sell or share personal information for cross-context behavioral advertising. To exercise any CCPA right, contact us using the details on our Contact page; we will verify your identity before acting on the request.',
      ],
    },
    {
      id: 'european-residents',
      heading: 'European residents',
      paragraphs: [
        'If you are in the European Economic Area, the UK, or Switzerland, the General Data Protection Regulation (GDPR) applies. Our lawful bases for processing are: performance of a contract (running your account and subscription), legitimate interest (crash reporting, product analytics), and consent (optional Google sign-in).',
        'You have the right to access, rectify, erase, restrict, or port your data, and to object to processing based on legitimate interest, by contacting us. You also have the right to lodge a complaint with your local supervisory authority.',
      ],
    },
    {
      id: 'childrens-privacy',
      heading: "Children's privacy",
      paragraphs: [
        'Thrivo is not directed at, and is not intended for use by, anyone under 16. We do not knowingly collect personal information from children. If we learn that a child has created an account, we will delete it. If you believe a child has provided us with personal information, contact us and we will remove it promptly.',
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      paragraphs: [
        'We encrypt data in transit (TLS) and at rest, store credentials as salted hashes rather than plain text, and restrict internal access to the data each system component actually needs. Sign-in codes are single-use and short-lived.',
        'No method of transmission or storage is 100% secure, so while we work to protect your information, we cannot guarantee absolute security. If we become aware of a breach affecting your data, we will notify you as required by applicable law.',
      ],
    },
    {
      id: 'changes-to-this-policy',
      heading: 'Changes to this policy',
      paragraphs: [
        'We may update this Privacy Policy as Thrivo evolves. Material changes will be reflected by an updated "Effective date" at the top of this page, and where required by law, we will notify you directly (e.g. by email) before the change takes effect.',
        'Continued use of Thrivo after an update constitutes acceptance of the revised policy. If you have questions about a specific change, contact us — see our Contact page.',
      ],
    },
  ],
};
