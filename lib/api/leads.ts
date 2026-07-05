import type { LeadCapturePayload } from '@beorchid-llc/thrivo-contracts';
import { apiUrl } from '@/lib/config/env';

export type { LeadCapturePayload };

/**
 * First API-calling code in this repo -- deliberately minimal (plain fetch,
 * no client library) for a single one-off form POST. Only the payload TYPE is
 * imported from the contracts package, not its Zod schema: thrivo-public is on
 * zod v4 for its own code, while the contracts package's schemas are built
 * against zod v3 as a peer dependency, so re-validating with the imported
 * schema object here would depend on the two majors staying interop-safe at
 * runtime. The backend re-validates with the real schema regardless (the
 * source of truth), and the email input's `type="email" required` already
 * covers the client-side UX case.
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
