import {
  AppDestinationFallback,
  appFallbackMetadata,
} from '@/components/general/AppDestinationFallback';

export const metadata = appFallbackMetadata;
export default function SubscriptionFallbackPage() {
  return (
    <AppDestinationFallback
      title="Manage your Thrivo subscription"
      description="Open Thrivo to review your plan and subscription status."
      schemePath="settings/subscription"
    />
  );
}
