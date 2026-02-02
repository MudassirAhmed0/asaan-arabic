import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Asaan Arabic CMS',
  description: 'Content management portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} font-sans bg-gray-50/50 text-slate-900 antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '14px',
              padding: '12px 16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: { primary: '#2dd4bf', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#f87171', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
