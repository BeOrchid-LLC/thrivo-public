import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Thrivo — Weight loss without the nonsense',
    short_name: 'Thrivo',
    description:
      'Honest weight loss: barcode food scanning, macro tracking, and transparent pricing.',
    start_url: '/',
    display: 'browser',
    background_color: '#FFFFFF',
    theme_color: '#09823C',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
