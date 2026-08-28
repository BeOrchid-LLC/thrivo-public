import type { LegalDocContent } from './types';

/**
 * Public subscription guidance for Thrivo. Apple and Google control billing,
 * renewal timing, and refunds for purchases made through their stores.
 */
export const CANCELLATION_POLICY_CONTENT: LegalDocContent = {
  title: 'Cancellation Policy',
  subtitle: 'How to stop renewal, keep access through your paid period, and request a refund',
  meta: [
    { label: 'Effective date', value: 'June 12, 2026' },
    { label: 'Company', value: 'BeOrchid LLC' },
    { label: 'Applies to', value: 'Thrivo Premium subscriptions' },
    { label: 'Billing platforms', value: 'Apple App Store & Google Play' },
  ],
  sections: [
    {
      id: 'cancel-anytime',
      heading: 'Cancel anytime',
      callout: 'No retention hoops. No win-back emails.',
      blocks: [
        {
          type: 'paragraph',
          text: 'You can turn off automatic renewal at any time. Cancelling stops the next charge; it does not delete your Thrivo account or erase your food, weight, or progress data.',
        },
        {
          type: 'paragraph',
          text: 'Because Thrivo subscriptions are purchased through Apple or Google, cancellation must be completed in the store account that manages your subscription. Removing the app or deleting your Thrivo account does not necessarily cancel a store subscription.',
        },
      ],
    },
    {
      id: 'how-to-cancel',
      heading: 'How to cancel',
      blocks: [
        {
          type: 'list',
          label: 'iPhone or iPad',
          items: [
            { text: 'Open Settings and tap your Apple Account name' },
            { text: 'Tap Subscriptions, then Thrivo' },
            { text: 'Tap Cancel Subscription and confirm' },
          ],
        },
        {
          type: 'list',
          label: 'Android',
          items: [
            { text: 'Open Google Play and tap your profile icon' },
            { text: 'Choose Payments & subscriptions, then Subscriptions' },
            { text: 'Select Thrivo, tap Cancel subscription, and follow the prompts' },
          ],
        },
        {
          type: 'paragraph',
          text: 'Store menus can change. If you do not see Thrivo in the list, check that you are signed in to the Apple or Google account used to subscribe.',
        },
      ],
    },
    {
      id: 'when-cancellation-takes-effect',
      heading: 'When cancellation takes effect',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cancellation turns off automatic renewal. Your Premium features normally remain available until the end of the current paid period or trial, and the store should show the date access ends. After that date, your account moves to the Free tier unless you subscribe again.',
        },
        {
          type: 'paragraph',
          text: 'To avoid a renewal charge, cancel at least 24 hours before the renewal date shown by Apple or Google. The store’s subscription record controls the renewal time and status.',
        },
      ],
    },
    {
      id: 'free-trials',
      heading: 'Free trials',
      blocks: [
        {
          type: 'paragraph',
          text: 'If your offer includes a free trial, cancel before the trial ends if you do not want it to convert to the Premium plan shown when you started the trial. Trial eligibility, duration, and the conversion date can vary by store, region, and promotion.',
        },
      ],
    },
    {
      id: 'refunds',
      heading: 'Refunds',
      blocks: [
        {
          type: 'paragraph',
          text: 'Apple and Google process payments and decide refund requests for subscriptions purchased through their stores. BeOrchid LLC cannot issue a direct refund for those purchases or change a store’s billing decision.',
        },
        {
          type: 'list',
          label: 'Where to request help',
          items: [
            { term: 'Apple', text: 'use Apple’s purchase history or report-a-problem flow' },
            { term: 'Google', text: 'use Google Play’s order history or refund flow' },
          ],
        },
        {
          type: 'paragraph',
          text: 'If you were charged after cancelling, first confirm the subscription status and renewal date in the relevant store account. For account or access questions, contact us with the email on your Thrivo account and the store receipt details — never send payment-card numbers.',
        },
      ],
    },
    {
      id: 'account-deletion',
      heading: 'Cancellation is different from account deletion',
      blocks: [
        {
          type: 'paragraph',
          text: 'Deleting your Thrivo account is a separate action. If you want to stop both billing and use of the service, cancel the store subscription first, then delete your account from Thrivo Settings. See our Privacy Policy for information about data handling and deletion.',
        },
      ],
    },
    {
      id: 'contact-cancellations',
      heading: 'Need help?',
      blocks: [
        {
          type: 'paragraph',
          text: 'For subscription-access or account questions, contact subscriptions@beorchid.com. We can help you find the right store account and investigate access issues, but the store remains responsible for platform billing and refunds.',
        },
        {
          type: 'callout-bar',
          text: 'Questions about cancellation or access?',
          action: {
            label: 'Email subscriptions@beorchid.com',
            href: 'mailto:subscriptions@beorchid.com',
          },
        },
      ],
    },
    {
      id: 'policy-changes',
      heading: 'Changes to this policy',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update this policy as Thrivo or the app stores change. Material changes will be reflected by an updated effective date at the top of this page.',
        },
      ],
    },
  ],
};
