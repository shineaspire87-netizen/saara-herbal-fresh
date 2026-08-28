import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Saara Herbal Fresh | 100% Traditional & Organic Rice Brand',
  description:
    'Buy pure traditional and organic unpolished heritage rice (Karunkuruvai, Sivappu Kavuni, Thooyamalli, Poongar, Kuzhiyadechan) direct from certified farmers. Fast delivery across Tamil Nadu & India.',
  keywords: [
    'Saara Herbal Fresh',
    'Traditional Rice',
    'Organic Rice',
    'Karunkuruvai Rice',
    'Kavuni Rice',
    'Thooyamalli Rice',
    'Poongar Rice',
    'Kuzhiyadechan Rice',
    'Siddha Rice',
    'Unpolished Rice'
  ],
  authors: [{ name: 'Saara Herbal Fresh' }],
  icons: {
    icon: '/images/logo.webp',
  },
  openGraph: {
    title: 'Saara Herbal Fresh | Traditional & Organic Rice',
    description: 'Heritage traditional rice direct from organic farmers with doorstep delivery.',
    images: ['/images/logo.webp'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#065f46',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#faf8f5] text-gray-900 min-h-screen flex flex-col" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
