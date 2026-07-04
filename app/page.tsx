import { MainLayout } from '@/components/layout/MainLayout';

/**
 * Landing page shell. Sections are deliberately not built yet — see
 * docs/BUILD-NOTES.md for the section plan, Figma node IDs, and the rule to
 * compose sections from the shared atoms in components/atoms + components/ui.
 */
export default function HomePage() {
  return (
    <MainLayout className="pt-[var(--header-height)]">
      <section className="section-padding">
        <div className="regular-container">
          <p className="text-eyebrow">Coming soon</p>
          <h1 className="text-display mt-4">
            Weight loss <span className="gradient-text">without</span> the nonsense.
          </h1>
          <p className="text-body-lg mt-6 max-w-md">
            Landing page sections are built in the next phase. This shell verifies the design
            tokens, layout chrome, and toolchain.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
