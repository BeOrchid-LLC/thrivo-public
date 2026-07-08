import type { Metadata } from 'next';
import { LegalDocLayout } from '@/components/general/LegalDocLayout';
import { PRIVACY_POLICY_CONTENT } from '@/lib/content/legal/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How BeOrchid LLC collects, uses, and protects your personal information in Thrivo.',
};

export default function PrivacyPolicyPage() {
  return <LegalDocLayout content={PRIVACY_POLICY_CONTENT} />;
}
