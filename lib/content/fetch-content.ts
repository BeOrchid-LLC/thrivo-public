import { reportClientError } from '@/lib/observability/clientErrorReporting';

/**
 * Seam every section content loader goes through. Right now `loader` just
 * resolves local defaults (no content backend exists yet), but this is the
 * one place that changes to a real CMS/API fetch later -- callers in
 * lib/content/*.ts stay the same either way.
 *
 * Errors are logged then re-thrown (not swallowed) so the section's
 * Suspense/SectionErrorBoundary pair can catch them and degrade to that
 * section's own hardcoded fallback content, instead of silently serving
 * stale data or taking down the whole page.
 */
export async function fetchSectionContent<T>(
  section: string,
  loader: () => Promise<T>
): Promise<T> {
  try {
    return await loader();
  } catch (error) {
    await reportClientError(error, { boundary: 'content-fetch', section });
    throw error;
  }
}
