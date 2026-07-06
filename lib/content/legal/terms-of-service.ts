import type { LegalDocContent } from './types';

export const TERMS_OF_SERVICE_CONTENT: LegalDocContent = {
  title: 'Terms of Service',
  subtitle: 'The terms that govern your use of the Thrivo app and account',
  meta: [
    { label: 'Effective date', value: 'January 1, 2026' },
    { label: 'Company', value: 'BeOrchid LLC' },
    { label: 'Platform', value: 'Thrivo iOS & Android' },
    { label: 'Client', value: 'All Thrivo Users' },
  ],
  sections: [
    {
      id: 'acceptance-of-terms',
      heading: 'Acceptance of terms',
      paragraphs: [
        'By creating a Thrivo account or using the app, you agree to these Terms of Service and to our Privacy Policy. If you do not agree, do not use Thrivo. We may update these terms from time to time — see Changes to these terms below.',
      ],
    },
    {
      id: 'the-service',
      heading: 'The service',
      paragraphs: [
        'Thrivo is a calorie and macro tracking app: barcode food scanning, manual food logging, daily calorie and macro targets, water tracking, and progress charts. Thrivo is a tracking tool, not a medical device or a substitute for professional medical advice — see Health & medical disclaimer below.',
      ],
    },
    {
      id: 'accounts-eligibility',
      heading: 'Accounts & eligibility',
      paragraphs: [
        'You must be at least 16 years old to create a Thrivo account. You are responsible for keeping your sign-in credentials secure and for all activity under your account. Tell us right away if you suspect unauthorized access.',
        'You agree to provide accurate account information (at minimum, a working email address) and to keep it up to date.',
      ],
    },
    {
      id: 'subscriptions-billing',
      heading: 'Subscriptions & billing',
      callout: 'Transparent pricing, no surprises.',
      paragraphs: [
        'Thrivo offers a Free tier and a paid Premium subscription, billed monthly or annually through the Apple App Store or Google Play. Subscriptions renew automatically at the price shown at purchase, unless cancelled before the renewal date.',
        'Billing, renewals, and refunds for App Store / Google Play purchases are handled by Apple and Google according to their own terms — we do not have access to your payment details and cannot issue refunds directly for platform purchases.',
      ],
      groups: [
        {
          icon: 'credit-card',
          label: 'How billing works',
          items: [
            'Prices are shown in the app before you subscribe, in your local currency where supported',
            'Subscriptions renew automatically unless cancelled at least 24 hours before the renewal date',
            'Cancel any time from your App Store / Google Play account settings — your Premium access continues until the end of the paid period',
            'We use RevenueCat to verify subscription status; it does not process payments itself',
          ],
        },
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      paragraphs: ['When using Thrivo, you agree not to:'],
      groups: [
        {
          icon: 'ban',
          label: 'Not permitted',
          items: [
            'Attempt to access another user’s account or data',
            'Reverse-engineer, decompile, or scrape the app or its API',
            'Use the app for any unlawful purpose or to violate anyone’s rights',
            'Interfere with or disrupt Thrivo’s infrastructure or security',
            'Circumvent subscription limits or paywalls',
          ],
        },
      ],
    },
    {
      id: 'health-disclaimer',
      heading: 'Health & medical disclaimer',
      callout: 'Not medical advice.',
      paragraphs: [
        'Thrivo provides calorie and macro estimates for informational and tracking purposes only. It is not a medical device, and its guidance does not replace advice from a qualified physician, dietitian, or other healthcare professional.',
        'Consult a healthcare professional before starting any weight-loss or nutrition program, particularly if you are pregnant, nursing, have a medical condition, or take medication. You are solely responsible for decisions you make based on information in the app.',
      ],
    },
    {
      id: 'user-content',
      heading: 'User content & food log data',
      paragraphs: [
        'You retain ownership of the data you enter into Thrivo (food logs, weight entries, custom foods, and similar). By using the app, you grant BeOrchid LLC a limited license to store, process, and display that data back to you as part of the service — including syncing it across your devices.',
        'We do not claim ownership of your data and do not use it for purposes beyond running and improving Thrivo, as described in our Privacy Policy.',
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual property',
      paragraphs: [
        'The Thrivo name, logo, app design, and underlying software are the property of BeOrchid LLC and are protected by copyright, trademark, and other laws. You may not copy, modify, distribute, or create derivative works from the app or its branding without our written permission.',
      ],
    },
    {
      id: 'termination',
      heading: 'Termination',
      paragraphs: [
        'You may delete your account at any time from Settings. We may suspend or terminate your account if you violate these terms, misuse the service, or if required by law. Where reasonably possible, we will notify you before termination and explain the reason.',
        'Sections that by their nature should survive termination — including Intellectual property and Disclaimers & limitation of liability — continue to apply after your account is closed.',
      ],
    },
    {
      id: 'disclaimers-liability',
      heading: 'Disclaimers & limitation of liability',
      paragraphs: [
        'Thrivo is provided "as is" and "as available," without warranties of any kind, express or implied, including fitness for a particular purpose or non-infringement. We do not guarantee the app will be uninterrupted, error-free, or that calorie/macro estimates will be perfectly accurate.',
        'To the fullest extent permitted by law, BeOrchid LLC is not liable for any indirect, incidental, or consequential damages arising from your use of Thrivo, including decisions made based on data or estimates in the app.',
      ],
      groups: [
        {
          icon: 'shield-alert',
          label: 'What this means',
          items: [
            'We work to keep Thrivo accurate and reliable, but food-database and macro estimates can be imperfect',
            'You use Thrivo’s tracking and guidance at your own discretion',
            'Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim',
          ],
        },
      ],
    },
    {
      id: 'governing-law',
      heading: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of the jurisdiction in which BeOrchid LLC is incorporated, without regard to conflict-of-law principles. Any dispute arising from these terms or your use of Thrivo will be resolved in the courts of that jurisdiction, unless applicable consumer-protection law in your country requires otherwise.',
      ],
    },
    {
      id: 'changes-to-terms',
      heading: 'Changes to these terms',
      paragraphs: [
        'We may update these Terms of Service as Thrivo evolves. Material changes will be reflected by an updated "Effective date" at the top of this page, and where required by law, we will notify you before the change takes effect.',
        'Continuing to use Thrivo after an update constitutes acceptance of the revised terms. If you have questions, contact us — see our Contact page.',
      ],
    },
  ],
};
