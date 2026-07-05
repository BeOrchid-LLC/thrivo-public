/** Match pathname to href without treating sibling prefixes as active. */
export function isPathActive(pathname: string, href: string, exact = false): boolean {
  const normalized = pathname.replace(/\/$/, '') || '/';
  const normalizedHref = href.replace(/\/$/, '') || '/';

  if (normalizedHref === '/') return normalized === '/';
  if (exact) return normalized === normalizedHref;

  return normalized === normalizedHref || normalized.startsWith(`${normalizedHref}/`);
}
