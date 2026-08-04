import {
  AppDestinationFallback,
  appFallbackMetadata,
} from '@/components/general/AppDestinationFallback';

export const metadata = appFallbackMetadata;
export default function MetricsFallbackPage() {
  return (
    <AppDestinationFallback
      title="Your Thrivo progress"
      description="Open Thrivo to review your food-logging history and progress."
      schemePath="metrics"
    />
  );
}
