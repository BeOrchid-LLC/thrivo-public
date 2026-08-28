import type { Metadata } from 'next';
import { LegalDocLayout } from '@/components/general/LegalDocLayout';
import { CANCELLATION_POLICY_CONTENT } from '@/lib/content/legal/cancellation-policy';

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'How to cancel a Thrivo Premium subscription, manage renewal, and request a refund.',
};

export default function CancellationPolicyPage() {
  return <LegalDocLayout content={CANCELLATION_POLICY_CONTENT} />;
}
