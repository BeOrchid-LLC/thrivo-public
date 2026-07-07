export interface LegalDocMeta {
  label: string;
  value: string;
}

export interface LegalListItem {
  /** Bold lead-in before the item text (e.g. "RevenueCat" in "RevenueCat — subscription management"). Omit for a plain bullet. */
  term?: string;
  text: string;
}

export interface LegalParagraphBlock {
  type: 'paragraph';
  /** Plain text — any email address in it is auto-linked as mailto: (see LinkifiedText). */
  text: string;
}

/**
 * A bordered card of bullet items. The header (icon + label) is optional —
 * some lists render as a plain, title-less card (e.g. "Your rights").
 */
export interface LegalListBlock {
  type: 'list';
  /** Emoji shown next to the label, e.g. "👤". Content-only — no icon-key/lookup-map indirection needed since a string is trivially serializable across the Server->Client Component boundary. */
  icon?: string;
  label?: string;
  items: LegalListItem[];
}

/** An icon-less, title + paragraph mini-card (e.g. "Retention"). */
export interface LegalNoteBlock {
  type: 'note';
  title: string;
  text: string;
}

/** A highlighted bar, optionally with an action button (e.g. "Email us"). */
export interface LegalCalloutBarBlock {
  type: 'callout-bar';
  text: string;
  action?: {
    label: string;
    href: string;
  };
}

export type LegalBlock =
  LegalParagraphBlock | LegalListBlock | LegalNoteBlock | LegalCalloutBarBlock;

export interface LegalDocSection {
  /** Anchor id — also the TOC entry's target and the scrollspy key. */
  id: string;
  heading: string;
  /** Short callout pill under the heading (e.g. "Your data is yours."). */
  callout?: string;
  /** Ordered content — sections mix paragraph/list/note/callout-bar blocks in whatever order the design calls for. */
  blocks: LegalBlock[];
}

export interface LegalDocContent {
  title: string;
  subtitle: string;
  meta: LegalDocMeta[];
  sections: LegalDocSection[];
}
