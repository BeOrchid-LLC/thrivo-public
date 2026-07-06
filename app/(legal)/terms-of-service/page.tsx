import type { Metadata } from 'next';
import { LegalDocLayout } from '@/components/general/LegalDocLayout';
import { TERMS_OF_SERVICE_CONTENT } from '@/lib/content/legal/terms-of-service';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of the Thrivo app and account.',
};

export default function TermsOfServicePage() {
  return <LegalDocLayout content={TERMS_OF_SERVICE_CONTENT} />;
}
