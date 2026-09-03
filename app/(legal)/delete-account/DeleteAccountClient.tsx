'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { MailCheck, ShieldCheck, Trash2 } from 'lucide-react';
import { RegularInput } from '@/components/atoms/RegularInput';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import { SectionContainer } from '@/components/general/SectionContainer';
import { SectionHeader } from '@/components/general/SectionHeader';
import {
  accountDeletionRequestSchema,
  confirmAccountDeletion,
  requestAccountDeletion,
} from '@/lib/api/account-deletion';

type FormValues = z.input<typeof accountDeletionRequestSchema>;
type State = 'form' | 'check-email' | 'confirm' | 'queued' | 'invalid' | 'error';

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Trash2;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface p-5">
      <Icon className="size-5 text-primary" aria-hidden="true" />
      <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  );
}

export function DeleteAccountClient() {
  const params = useSearchParams();
  const token = params.get('token');
  const [state, setState] = useState<State>(token ? 'confirm' : 'form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(accountDeletionRequestSchema),
    defaultValues: { email: '' },
  });

  const submitRequest = async (values: FormValues) => {
    setIsSubmitting(true);
    setMessage('');
    try {
      await requestAccountDeletion(values);
      setSubmittedEmail(values.email);
      setState('check-email');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Please try again in a moment.');
      setState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirm = async () => {
    if (!token) {
      setState('invalid');
      return;
    }
    setIsSubmitting(true);
    setMessage('');
    try {
      await confirmAccountDeletion(token);
      setState('queued');
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : '';
      setMessage(nextMessage);
      setState(
        nextMessage.toLowerCase().includes('invalid') ||
          nextMessage.toLowerCase().includes('expired')
          ? 'invalid'
          : 'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer customContainer className="min-h-[calc(100vh-var(--header-height))]">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Account deletion"
          heading="Delete your Thrivo account"
          subtext="Thrivo is made by BeOrchid LLC. Use this page to request permanent deletion of your account and associated data without reinstalling the app."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <InfoCard icon={Trash2} title="Permanent">
            Deletion removes your profile, goals, health and nutrition entries, progress, and
            account identity.
          </InfoCard>
          <InfoCard icon={ShieldCheck} title="Verified">
            We send a single-use confirmation link so only someone with access to the email can
            continue.
          </InfoCard>
          <InfoCard icon={MailCheck} title="Background cleanup">
            Access is locked immediately after confirmation; external provider retries can make
            final cleanup take longer.
          </InfoCard>
        </div>

        <div className="card-surface mt-8 p-6 sm:p-8" aria-live="polite">
          {state === 'form' || state === 'error' ? (
            <>
              <h2 className="text-xl font-semibold text-foreground">Request deletion</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Enter the email address on your Thrivo account. We show the same response whether or
                not an account uses it.
              </p>
              <form onSubmit={handleSubmit(submitRequest)} noValidate className="mt-6 space-y-5">
                <RegularInput
                  id="deletion-email"
                  type="email"
                  label="Account email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  errors={errors.email?.message ? [errors.email.message] : []}
                  {...register('email')}
                />
                <RegularBtn
                  type="submit"
                  text="Send confirmation email"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                />
              </form>
              {state === 'error' && (
                <p className="mt-4 text-sm text-red-600" role="alert">
                  {message}
                </p>
              )}
            </>
          ) : null}

          {state === 'check-email' ? (
            <div role="status">
              <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                If a Thrivo account uses{' '}
                <span className="font-medium text-foreground">{submittedEmail}</span>, a
                confirmation link is on its way. The link expires in 30 minutes.
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                If you did not request deletion, you can ignore the email.
              </p>
            </div>
          ) : null}

          {state === 'confirm' ? (
            <div>
              <h2 className="text-xl font-semibold text-foreground">Confirm permanent deletion</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                This action is permanent. Confirming will lock account access immediately and queue
                background deletion of your profile, goals, health and nutrition entries, progress,
                and account identity.
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Apple and Google subscriptions are not cancelled automatically. Cancel any store
                subscription separately before continuing.
              </p>
              <RegularBtn
                type="button"
                text="Confirm deletion"
                variant="destructive"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={confirm}
                className="mt-6"
              />
            </div>
          ) : null}

          {state === 'queued' ? (
            <div role="status">
              <h2 className="text-xl font-semibold text-foreground">Deletion queued</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Your Thrivo account is locked immediately. The remaining cleanup runs in the
                background and normally completes within the timeframe described in our Privacy
                Policy. It may take longer if an external provider requires retries.
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Store subscriptions are separate and are not cancelled automatically.
              </p>
            </div>
          ) : null}

          {state === 'invalid' ? (
            <div role="alert">
              <h2 className="text-xl font-semibold text-foreground">
                This link is no longer valid
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The confirmation link may have expired, already been used, or been replaced by a
                newer request. Start again or contact{' '}
                <a
                  className="font-semibold text-primary-active hover:underline"
                  href="mailto:subscriptions@beorchid.com">
                  subscriptions@beorchid.com
                </a>
                .
              </p>
            </div>
          ) : null}
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-muted-foreground">
          Need help with a privacy or deletion request?{' '}
          <a
            className="font-semibold text-primary-active hover:underline"
            href="mailto:subscriptions@beorchid.com">
            subscriptions@beorchid.com
          </a>
        </p>
      </div>
    </SectionContainer>
  );
}
