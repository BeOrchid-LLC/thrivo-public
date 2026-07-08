import type { Metadata } from 'next';
import { Mail, ShieldCheck, Share2 } from 'lucide-react';
import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import { LegalFooter } from '@/components/layout/LegalFooter';
import { SOCIAL_LINKS } from '@/lib/constants/texts';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ways to reach the Thrivo team — support, privacy questions, and social.',
};

/**
 * Simpler than Privacy Policy / Terms of Service — no sidebar/scrollspy, just
 * the shared (legal) header/footer and a short list of contact channels.
 * No form: there's no contact-submission backend endpoint yet, so this
 * points people at real channels instead of a submit button that goes nowhere.
 */
export default function ContactPage() {
  return (
    <>
      <SectionContainer customContainer>
        <SectionHeader
          eyebrow="Contact"
          heading="We're here to help."
          subtext="Reach the Thrivo team directly — we read every message."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card-surface p-6">
            <div className="flex size-10 items-center justify-center rounded-md bg-tint-tile">
              <Mail className="size-[19px] text-primary" aria-hidden />
            </div>
            <p className="text-card-title mt-4">General support</p>
            <p className="text-card-body mt-2">
              Questions about your account, subscription, or how Thrivo works.
            </p>
            <a
              href="mailto:support@thrivo.fit"
              className="mt-3 inline-block text-sm font-semibold text-primary-active hover:underline">
              support@thrivo.fit
            </a>
          </div>

          <div className="card-surface p-6">
            <div className="flex size-10 items-center justify-center rounded-md bg-tint-tile">
              <ShieldCheck className="size-[19px] text-primary" aria-hidden />
            </div>
            <p className="text-card-title mt-4">Privacy & data requests</p>
            <p className="text-card-body mt-2">
              Access, export, correct, or delete your personal data — see our Privacy Policy for
              details.
            </p>
            <a
              href="mailto:privacy@thrivo.fit"
              className="mt-3 inline-block text-sm font-semibold text-primary-active hover:underline">
              privacy@thrivo.fit
            </a>
          </div>

          <div className="card-surface p-6">
            <div className="flex size-10 items-center justify-center rounded-md bg-tint-tile">
              <Share2 className="size-[19px] text-primary" aria-hidden />
            </div>
            <p className="text-card-title mt-4">Follow along</p>
            <p className="text-card-body mt-2">Product updates and behind-the-scenes on social.</p>
            <div className="mt-3 flex flex-col gap-1">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary-active hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
      <LegalFooter />
    </>
  );
}
