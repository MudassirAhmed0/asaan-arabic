import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://asaanarabic.com'),
  title: 'Asaan Arabic — Samajh ke Parho',
  description:
    'Learn Quranic Arabic the easy way. Understand what you hear in salah, Taraweeh, and daily duas. 5 words a day, 5 minutes a lesson.',
  keywords: [
    'Quran Arabic',
    'Learn Quranic Arabic',
    'Asaan Arabic',
    'Pakistani Muslim app',
    'Understand Quran',
    'Ramadan',
    'Salah meaning',
    'Arabic vocabulary',
  ],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
      { url: '/icon-152x152.png', sizes: '152x152' },
    ],
  },
  openGraph: {
    title: 'Asaan Arabic — Understand the Quran, One Word at a Time',
    description:
      'Learn 5 Quranic Arabic words a day in just 5 minutes. Understand what you hear in salah, Taraweeh, and daily duas. Free forever, no ads.',
    url: 'https://asaanarabic.com',
    siteName: 'Asaan Arabic',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Asaan Arabic — Samajh ke Parho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asaan Arabic — Understand the Quran, One Word at a Time',
    description:
      'Learn 5 Quranic Arabic words a day in just 5 minutes. Understand what you hear in salah, Taraweeh, and daily duas. Free forever, no ads.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
