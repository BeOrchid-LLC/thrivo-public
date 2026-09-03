import { z } from 'zod';
import { apiUrl } from '@/lib/config/env';

// These schemas mirror the published @beorchid-llc/thrivo-contracts account-
// deletion contract. The public app can be upgraded to the next published
// minor without changing this API boundary.
export const accountDeletionRequestSchema = z.object({
  email: z
    .string()
    .email()
    .max(254)
    .transform(email => email.trim().toLowerCase()),
});

export type AccountDeletionRequest = z.input<typeof accountDeletionRequestSchema>;

export type AccountDeletionConfirmation = { status: 'queued' };

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

async function post<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });
  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!response.ok || !body?.success) {
    throw new Error(body?.message ?? 'Something went wrong. Please try again.');
  }
  return body.data as T;
}

export function requestAccountDeletion(payload: AccountDeletionRequest): Promise<null> {
  return post<null>('/api/v1/account-deletion-requests', payload);
}

export function confirmAccountDeletion(token: string): Promise<AccountDeletionConfirmation> {
  return post<AccountDeletionConfirmation>('/api/v1/account-deletion-requests/confirm', { token });
}
