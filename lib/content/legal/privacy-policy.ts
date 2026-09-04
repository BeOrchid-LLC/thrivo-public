import type { LegalDocContent } from './types';

/**
 * Static legal copy — deliberately not routed through `lib/content/fetch-content.ts`
 * like the marketing sections in `app/_sections`. That seam exists for
 * CMS-editable short-form copy (docs/BUILD-NOTES.md rule 2); long-form legal
 * text is compliance-sensitive and changes rarely and deliberately, so it's
 * plain static data colocated with code instead.
 *
 * Vendor names below are the real integrations verified in thrivo-backend/
 * thrivo-mobile (Open Food Facts, RevenueCat, Resend, Google OAuth, Sentry,
 * PostHog, Cloudflare R2) — the Figma content mock this was transcribed from
 * named different/placeholder vendors (Mixpanel, Stripe-as-primary, and a
 * few garbled names) and referenced a HealthKit integration that doesn't
 * exist in the app; both were swapped for the real thing per an explicit
 * call to substitute rather than transcribe verbatim.
 */
export const PRIVACY_POLICY_CONTENT: LegalDocContent = {
  title: 'Privacy Policy',
  subtitle: 'How BeOrchid LLC collects, uses, and protects your personal information in Thrivo',
  meta: [
    { label: 'Effective date', value: 'June 12, 2026' },
    { label: 'Company', value: 'BeOrchid LLC' },
    { label: 'Platform', value: 'Thrivo iOS & Android' },
    { label: 'Client', value: 'All Thrivo Users' },
  ],
  sections: [
    {
      id: 'information-we-collect',
      heading: 'Information we collect',
      callout: 'Your data is yours.',
      blocks: [
        {
          type: 'paragraph',
          text: "By using Thrivo you agree to these terms. If you're on a Family plan, this policy applies to everyone using your plan to deliver the app experience — your health data is never sold.",
        },
        {
          type: 'list',
          icon: '👤',
          label: 'Account information',
          items: [
            { text: 'Email address — required for account creation and login' },
            { text: 'Name (optional)' },
            { text: 'Password' },
          ],
        },
        {
          type: 'list',
          icon: '💪',
          label: 'Health & fitness data',
          items: [
            { text: 'Body weight and daily calorie targets' },
            { text: 'Calorie intake and daily nutrition goals' },
            { text: 'Macronutrient data: protein, carbohydrates, fat' },
            { text: 'Daily steps' },
            { text: 'Progress and weight-trend check-ins' },
          ],
        },
        {
          type: 'list',
          icon: '🍉',
          label: 'Food log data',
          items: [
            { text: 'Food and meals logged by you' },
            { text: 'Nutritional information from the Open Food Facts database' },
          ],
        },
        {
          type: 'list',
          icon: '📱',
          label: 'Usage and Technical Data',
          items: [
            { text: 'Device type and operating system' },
            { text: 'App usage events and interaction patterns (via PostHog)' },
            { text: 'Error logs and crash reports (via Sentry)' },
            { text: 'Subscription and payment status (via RevenueCat)' },
          ],
        },
      ],
    },
    {
      id: 'how-we-use-your-information',
      heading: 'How we use your information',
      blocks: [
        {
          type: 'list',
          items: [
            { text: 'Personalize and improve the Thrivo experience' },
            { text: 'Enable complete health and nutrition goal tracking' },
            { text: 'Process subscription payments and manage your account' },
            { text: 'Contact you about account and notification settings (via Resend)' },
            { text: 'Analyze product usage to improve features' },
            { text: 'Comply with applicable legal obligations' },
          ],
        },
      ],
    },
    {
      id: 'third-party-services',
      heading: 'Third-party services',
      blocks: [
        {
          type: 'paragraph',
          text: 'Thrivo uses the following third-party services, each governed by their own privacy policy:',
        },
        {
          type: 'list',
          items: [
            {
              term: 'Open Food Facts',
              text: 'nutritional and food database for barcode scanning and search',
            },
            { term: 'RevenueCat', text: 'subscription and in-app purchase management' },
            { term: 'Resend', text: 'transactional email delivery' },
            { term: 'Google', text: 'optional "Sign in with Google" authentication' },
            { term: 'Sentry', text: 'crash and error reporting' },
            { term: 'PostHog', text: 'product analytics' },
            { term: 'Cloudflare R2', text: 'object storage for uploaded images (optional)' },
          ],
        },
      ],
    },
    {
      id: 'google-user-data',
      heading: 'Google Sign-In and Google user data',
      blocks: [
        {
          type: 'paragraph',
          text: 'When you choose Sign in with Google, Thrivo receives the basic identity information needed to create or link your account, such as your Google account email address, name, and a unique provider account identifier. We may also receive a profile image if Google provides one.',
        },
        {
          type: 'paragraph',
          text: 'We use this information only to authenticate you, create or link your Thrivo account, maintain secure sessions, prevent account abuse, and display your account profile. We do not request or access Gmail, Google Drive, Google Calendar, contacts, or other unrelated Google services.',
        },
        {
          type: 'paragraph',
          text: 'Google Sign-In identity data is processed by our authentication provider and Thrivo, retained while your account is active, and deleted or anonymized under our account-deletion and data-retention practices when you delete your account. We do not sell this data, use it for advertising, or use it to train generalized artificial-intelligence or machine-learning models.',
        },
      ],
    },
    {
      id: 'health-data',
      heading: 'Health data',
      blocks: [
        {
          type: 'paragraph',
          text: "When you submit health data — including weight, calorie intake, macronutrients, and daily activity — we store it securely and use it solely to power Thrivo's features. We do not sell your health data to third parties or use it for advertising purposes. All health data is encrypted in transit using industry-standard protocols.",
        },
      ],
    },
    {
      id: 'data-retention',
      heading: 'Data retention',
      blocks: [
        {
          type: 'paragraph',
          text: 'We retain your data for as long as your account is active. If you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required by law to retain it longer.',
        },
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      blocks: [
        {
          type: 'list',
          items: [
            { text: 'Access — request a copy of your personal data' },
            { text: 'Correction — request correction of inaccurate data' },
            { text: 'Deletion — request deletion of your data' },
            { text: 'Portability — receive your data in a portable format' },
            { text: 'Opt-out of analytics — contact us to opt out of PostHog tracking' },
          ],
        },
        {
          type: 'callout-bar',
          text: 'To exercise any of these rights, email subscriptions@beorchid.com — we will respond within 30 days.',
          action: { label: 'Email us', href: 'mailto:subscriptions@beorchid.com' },
        },
      ],
    },
    {
      id: 'california-residents',
      heading: 'California residents (CCPA)',
      blocks: [
        {
          type: 'paragraph',
          text: 'California residents have the right to know what personal information is collected, to request deletion, and to opt out of the sale of personal information. We do not sell personal information. To submit a request, email subscriptions@beorchid.com.',
        },
      ],
    },
    {
      id: 'european-residents',
      heading: 'European residents (GDPR)',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you are located in the European Economic Area, you have rights under the GDPR including the right to access, rectify, delete, or restrict your data. Our lawful bases for processing are performance of contract and legitimate interests. To submit a GDPR request, email subscriptions@beorchid.com.',
        },
      ],
    },
    {
      id: 'childrens-privacy',
      heading: "Children's privacy (COPPA)",
      blocks: [
        {
          type: 'paragraph',
          text: 'Thrivo is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete it promptly.',
        },
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      blocks: [
        {
          type: 'paragraph',
          text: 'We implement industry-standard security measures and organizational controls to protect your data. No method of transmission over the internet or electronic storage is 100% secure — if you believe your account has been compromised, contact us immediately at subscriptions@beorchid.com.',
        },
      ],
    },
    {
      id: 'changes-to-this-policy',
      heading: 'Changes to this policy',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update this policy from time to time. We will notify you of material changes via in-app notification or email. Continued use of Thrivo after changes constitutes acceptance of the revised policy.',
        },
      ],
    },
  ],
};
