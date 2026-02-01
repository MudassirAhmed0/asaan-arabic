import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
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
  openGraph: {
    title: 'Asaan Arabic — Samajh ke Parho',
    description:
      'Understand what you hear in salah and Taraweeh. Learn 5 Quranic words a day.',
    url: 'https://asaanarabic.com',
    siteName: 'Asaan Arabic',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asaan Arabic — Samajh ke Parho',
    description:
      'Understand what you hear in salah and Taraweeh. Learn 5 Quranic words a day.',
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
      </body>
    </html>
  );
}
