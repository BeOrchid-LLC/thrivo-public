import {
  AppDestinationFallback,
  appFallbackMetadata,
} from '@/components/general/AppDestinationFallback';

export const metadata = appFallbackMetadata;
export default function DashboardFallbackPage() {
  return (
    <AppDestinationFallback
      title="Your Thrivo dashboard"
      description="Open Thrivo to see today's calories, macros, and logging progress."
      schemePath="dashboard"
    />
  );
}
