'use client';

import { Component, type ReactNode } from 'react';
import { reportClientError } from '@/lib/observability/clientErrorReporting';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  /** Rendered instead of `children` when a descendant throws -- typically the same section, given its hardcoded fallback content. */
  fallback: ReactNode;
  /** Section name for error-reporting context, e.g. "hero". */
  section: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

/**
 * Isolates a single section's content-fetch/render failures so the rest of
 * the page keeps working. Error boundaries must be class components -- there
 * is no hook equivalent.
 */
export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    void reportClientError(error, { boundary: 'section', section: this.props.section });
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
