import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DeleteAccountClient } from './DeleteAccountClient';
import { LegalFooter } from '@/components/layout/LegalFooter';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Delete account',
  description: 'Request permanent deletion of your Thrivo account and associated data.',
  robots: { index: false, follow: false },
};

export default function DeleteAccountPage() {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col">
      <Suspense fallback={null}>
        <DeleteAccountClient />
      </Suspense>
      <LegalFooter />
    </div>
  );
}
