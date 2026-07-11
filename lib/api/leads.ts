import type { LeadCapturePayload } from '@beorchid-llc/thrivo-contracts';
import { apiUrl } from '@/lib/config/env';

export type { LeadCapturePayload };

/**
 * First API-calling code in this repo -- deliberately minimal (plain fetch,
 * no client library) for a single one-off form POST. Client-side validation
 * lives in the calling form (CtaView), which imports and validates against
 * the real `leadCapturePayloadSchema` from `@beorchid-llc/thrivo-contracts`
 * (R6 I24 -- confirmed at runtime that the schema, built with zod as a peer
 * dependency, resolves against and validates correctly under this repo's
 * installed zod version; there is no cross-major interop issue). The backend
 * re-validates with the same schema regardless (the source of truth).
 */
export async function captureLead(payload: LeadCapturePayload): Promise<void> {
  const res = await fetch(`${apiUrl}/api/v1/leads/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? 'Something went wrong. Please try again.');
  }
}
