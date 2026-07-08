import type { LegalDocContent } from './types';

/**
 * Reconciled against thrivo-legal.pages.dev (live reference copy). Vendor
 * names use the real integrations verified in thrivo-backend/thrivo-mobile
 * (RevenueCat, Sentry, PostHog, Open Food Facts, Resend, Cloudflare R2,
 * Google OAuth) — the live copy's Stripe/Mixpanel aren't actually wired up
 * (see privacy-policy.ts for the same swap).
 *
 * Three facts confirmed with the business owner directly (not derivable
 * from code) rather than copied blind from the live reference:
 * - Minimum age 13 w/ parental consent under 18 (matches the COPPA language
 *   already committed in privacy-policy.ts, which the prior "16" draft did not)
 * - Free trial stated as 14 days to match thrivo-public's own pricing page —
 *   thrivo-mobile/src/config/pricing.ts currently hardcodes 7, that's a
 *   separate app bug to fix, not a copy decision
 * - Governing law: Delaware
 */
export const TERMS_OF_SERVICE_CONTENT: LegalDocContent = {
  title: 'Terms of Service',
  subtitle: 'The terms that govern your use of the Thrivo app and account',
  meta: [
    { label: 'Effective date', value: 'June 12, 2026' },
    { label: 'Company', value: 'BeOrchid LLC' },
    { label: 'Platform', value: 'Thrivo iOS & Android' },
    { label: 'Client', value: 'All Thrivo Users' },
  ],
  sections: [
    {
      id: 'acceptance-of-terms',
      heading: 'Acceptance of terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'By creating a Thrivo account or using the app, you agree to these Terms of Service and to our Privacy Policy. If you do not agree, do not use Thrivo. We may update these terms from time to time — see Changes to these terms below.',
        },
      ],
    },
    {
      id: 'the-service',
      heading: 'The service',
      blocks: [
        {
          type: 'paragraph',
          text: 'Thrivo is a calorie and macro tracking app: barcode food scanning, manual food logging, daily calorie and macro targets, water tracking, and progress charts. Thrivo is a tracking tool, not a medical device or a substitute for professional medical advice — see Health & medical disclaimer below.',
        },
      ],
    },
    {
      id: 'eligibility',
      heading: 'Eligibility',
      blocks: [
        {
          type: 'paragraph',
          text: 'You must be at least 13 years old to create a Thrivo account. If you are between 13 and 17 years old, you may only use Thrivo with the involvement and consent of a parent or legal guardian, who agrees to be bound by these terms on your behalf.',
        },
      ],
    },
    {
      id: 'account-registration',
      heading: 'Account registration',
      blocks: [
        {
          type: 'paragraph',
          text: 'You agree to provide accurate and complete registration information (at minimum, a working email address) and to keep it up to date. You are responsible for keeping your account credentials secure and confidential, and for all activity that occurs under your account. Notify us immediately at subscriptions@beorchid.com if you suspect unauthorized access.',
        },
      ],
    },
    {
      id: 'subscriptions-billing',
      heading: 'Subscriptions & billing',
      callout: 'Transparent pricing, no surprises.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Thrivo offers a Free tier and a paid Premium subscription, billed monthly or annually through the Apple App Store or Google Play. Subscriptions renew automatically at the price shown at purchase, unless cancelled before the renewal date.',
        },
        {
          type: 'paragraph',
          text: 'Billing, renewals, and refunds for App Store / Google Play purchases are handled by Apple and Google according to their own terms — we do not have access to your payment details and cannot issue refunds directly for platform purchases.',
        },
        {
          type: 'list',
          label: 'How billing works',
          items: [
            {
              text: 'Prices are shown in the app before you subscribe, in your local currency where supported',
            },
            {
              text: 'Subscriptions renew automatically unless cancelled at least 24 hours before the renewal date',
            },
            {
              text: 'Cancel any time from your App Store / Google Play account settings — your Premium access continues until the end of the paid period',
            },
            {
              text: 'We use RevenueCat to verify subscription status; it does not process payments itself',
            },
          ],
        },
      ],
    },
    {
      id: 'free-trial',
      heading: 'Free trial',
      blocks: [
        {
          type: 'paragraph',
          text: "New Thrivo accounts are eligible for a one-time 14-day free trial of Premium, where offered. You won't be charged during the trial. Unless you cancel before the trial ends — through your App Store / Google Play subscription settings — you'll be automatically charged the subscription price shown at signup once the trial period ends.",
        },
        {
          type: 'paragraph',
          text: 'Trial eligibility and length are controlled by the app store you subscribed through and may vary by region or promotion.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      blocks: [
        { type: 'paragraph', text: 'When using Thrivo, you agree not to:' },
        {
          type: 'list',
          label: 'Not permitted',
          items: [
            { text: 'Attempt to access another user’s account or data without authorization' },
            { text: 'Reverse-engineer, decompile, or scrape the app or its API' },
            { text: 'Use automated scripts or bots to interact with the app' },
            { text: 'Transmit viruses, malware, or other malicious code' },
            {
              text: 'Use the app for any unlawful purpose or to infringe anyone’s intellectual property or other rights',
            },
            { text: 'Interfere with or disrupt Thrivo’s infrastructure or security' },
            {
              text: 'Share your account credentials with others, or circumvent subscription limits or paywalls',
            },
          ],
        },
      ],
    },
    {
      id: 'health-disclaimer',
      heading: 'Health & medical disclaimer',
      callout: 'Not medical advice.',
      blocks: [
        {
          type: 'paragraph',
          text: 'Thrivo provides calorie and macro estimates for informational and tracking purposes only. It is not a medical device, and its guidance does not replace advice from a qualified physician, dietitian, or other healthcare professional.',
        },
        {
          type: 'paragraph',
          text: 'Consult a healthcare professional before starting any weight-loss or nutrition program, particularly if you are pregnant, nursing, have a medical condition, or take medication. You are solely responsible for decisions you make based on information in the app.',
        },
      ],
    },
    {
      id: 'user-content',
      heading: 'User content & food log data',
      blocks: [
        {
          type: 'paragraph',
          text: 'You retain ownership of the data you enter into Thrivo (food logs, weight entries, custom foods, and similar). By using the app, you grant BeOrchid LLC a limited license to store, process, and display that data back to you as part of the service — including syncing it across your devices.',
        },
        {
          type: 'paragraph',
          text: 'We do not claim ownership of your data and do not use it for purposes beyond running and improving Thrivo, as described in our Privacy Policy.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual property',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Thrivo name, logo, app design, and underlying software are the property of BeOrchid LLC and are protected by copyright, trademark, and other laws. You may not copy, modify, distribute, or create derivative works from the app or its branding without our written permission.',
        },
      ],
    },
    {
      id: 'third-party-services',
      heading: 'Third-party services',
      blocks: [
        {
          type: 'paragraph',
          text: 'Thrivo integrates the following third-party services to provide its features. Your use of these integrations is also subject to each provider’s own terms:',
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
        {
          type: 'paragraph',
          text: 'We are not responsible for the availability, content, or practices of these third-party services.',
        },
      ],
    },
    {
      id: 'termination',
      heading: 'Termination',
      blocks: [
        {
          type: 'paragraph',
          text: 'You may delete your account at any time from Settings. We may suspend or terminate your account if you violate these terms, misuse the service, or if required by law. Where reasonably possible, we will notify you before termination and explain the reason.',
        },
        {
          type: 'paragraph',
          text: 'Sections that by their nature should survive termination — including Intellectual property, Disclaimer of warranties, and Limitation of liability — continue to apply after your account is closed.',
        },
      ],
    },
    {
      id: 'disclaimer-of-warranties',
      heading: 'Disclaimer of warranties',
      blocks: [
        {
          type: 'paragraph',
          text: 'Thrivo is provided "as is" and "as available," without warranties of any kind, express or implied, including fitness for a particular purpose or non-infringement. We do not guarantee the app will be uninterrupted, error-free, or that calorie/macro estimates will be perfectly accurate.',
        },
      ],
    },
    {
      id: 'limitation-of-liability',
      heading: 'Limitation of liability',
      blocks: [
        {
          type: 'paragraph',
          text: 'To the fullest extent permitted by law, BeOrchid LLC is not liable for any indirect, incidental, or consequential damages arising from your use of Thrivo, including decisions made based on data or estimates in the app.',
        },
        {
          type: 'list',
          label: 'What this means',
          items: [
            {
              text: 'We work to keep Thrivo accurate and reliable, but food-database and macro estimates can be imperfect',
            },
            { text: 'You use Thrivo’s tracking and guidance at your own discretion' },
            {
              text: 'Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim',
            },
          ],
        },
      ],
    },
    {
      id: 'governing-law',
      heading: 'Governing law',
      blocks: [
        {
          type: 'paragraph',
          text: 'These terms are governed by the laws of the State of Delaware, without regard to conflict-of-law principles. Any dispute arising from these terms or your use of Thrivo will be resolved in the state or federal courts located in Delaware, unless applicable consumer-protection law in your country requires otherwise.',
        },
      ],
    },
    {
      id: 'changes-to-terms',
      heading: 'Changes to these terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update these Terms of Service as Thrivo evolves. Material changes will be reflected by an updated "Effective date" at the top of this page, and where required by law, we will notify you before the change takes effect.',
        },
        {
          type: 'paragraph',
          text: 'Continuing to use Thrivo after an update constitutes acceptance of the revised terms. If you have questions, contact us — see our Contact page.',
        },
      ],
    },
  ],
};
