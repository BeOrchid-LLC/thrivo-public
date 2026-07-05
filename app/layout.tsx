import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Providers } from '@/components/Providers';
import { LoadAnimationScreenDynamic } from '@/components/general/LoadAnimationScreenDynamic';
import { SEO_DETAILS } from '@/lib/constants/texts';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { image, ogDesc, ...seoFields } = SEO_DETAILS;

  return {
    ...seoFields,
    keywords: [...SEO_DETAILS.keywords],
    openGraph: {
      title: SEO_DETAILS.title.default,
      description: ogDesc,
      type: 'website',
      url: SEO_DETAILS.metadataBase,
      siteName: 'Thrivo',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'only light',
  themeColor: '#27AE60',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <body className="antialiased overflow-x-hidden">
        <NextTopLoader color="hsl(145 63% 42%)" height={3} showSpinner={false} />
        <LoadAnimationScreenDynamic />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
