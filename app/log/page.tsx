import {
  AppDestinationFallback,
  appFallbackMetadata,
} from '@/components/general/AppDestinationFallback';

export const metadata = appFallbackMetadata;
export default function LogFallbackPage() {
  return (
    <AppDestinationFallback
      title="Log food in Thrivo"
      description="Open Thrivo to scan, search, or describe a meal."
      schemePath="log"
    />
  );
}
