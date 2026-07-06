export interface LegalDocMeta {
  label: string;
  value: string;
}

/**
 * Key into `LEGAL_DOC_ICONS` (components/general/LegalDocLayout.tsx), not the
 * icon component itself — content files are imported by `page.tsx` (a Server
 * Component, for `export const metadata`), so a Lucide component reference
 * can't cross into `LegalDocLayout` (a Client Component) as a prop.
 */
export type LegalDocIconKey =
  'user' | 'activity' | 'shield' | 'server' | 'credit-card' | 'shield-alert' | 'ban';

/** A bordered icon+bullet-list card grouping related items within a section (e.g. "Account information"). */
export interface LegalDocGroup {
  icon: LegalDocIconKey;
  label: string;
  items: string[];
}

export interface LegalDocSection {
  /** Anchor id — also the TOC entry's target and the scrollspy key. */
  id: string;
  heading: string;
  /** Short callout pill under the heading (e.g. "Your data is yours."). */
  callout?: string;
  paragraphs: string[];
  groups?: LegalDocGroup[];
}

export interface LegalDocContent {
  title: string;
  subtitle: string;
  meta: LegalDocMeta[];
  sections: LegalDocSection[];
}
