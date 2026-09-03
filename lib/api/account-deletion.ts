import { z } from 'zod';
import {
  accountDeletionConfirmationResponseSchema,
  accountDeletionRequestPayloadSchema,
  accountDeletionRequestResponseSchema,
} from '@beorchid-llc/thrivo-contracts/account-deletion';
import type { AccountDeletionConfirmationResponse } from '@beorchid-llc/thrivo-contracts/account-deletion';
import { apiUrl } from '@/lib/config/env';

export const accountDeletionRequestSchema = accountDeletionRequestPayloadSchema;

export type AccountDeletionRequest = z.input<typeof accountDeletionRequestSchema>;

export type AccountDeletionConfirmation = AccountDeletionConfirmationResponse;

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
  return post<null>('/api/v1/account-deletion-requests', payload).then(data =>
    accountDeletionRequestResponseSchema.parse(data)
  );
}

export function confirmAccountDeletion(token: string): Promise<AccountDeletionConfirmation> {
  return post<AccountDeletionConfirmation>('/api/v1/account-deletion-requests/confirm', {
    token,
  }).then(data => accountDeletionConfirmationResponseSchema.parse(data));
}
