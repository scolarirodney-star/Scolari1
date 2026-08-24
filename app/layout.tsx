import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://al-angulo-deportes.scolari-rodney.chatgpt.site'),
  title: 'Al Ángulo | El deporte, sin vueltas',
  description: 'Noticias, resultados y clasificaciones de fútbol y Fórmula 1 con fuentes visibles.',
  openGraph: {
    title: 'Al Ángulo | El deporte, sin vueltas',
    description: 'Noticias, resultados y clasificaciones de fútbol y Fórmula 1 con fuentes visibles.',
    images: [{ url: 'https://al-angulo-deportes.scolari-rodney.chatgpt.site/og.png', width: 1200, height: 630, alt: 'Al Ángulo, fútbol y Fórmula 1' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al Ángulo | El deporte, sin vueltas',
    description: 'Noticias, resultados y clasificaciones de fútbol y Fórmula 1 con fuentes visibles.',
    images: ['https://al-angulo-deportes.scolari-rodney.chatgpt.site/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
