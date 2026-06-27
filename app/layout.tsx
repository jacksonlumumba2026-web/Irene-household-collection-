import type { Metadata } from 'next';
import { Outfit, Inter, Poppins } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });

export const metadata: Metadata = {
  title: 'Irene Household Collection | Premium Home Décor Kenya',
  description:
    'Premium furniture, home décor, kitchen essentials, curtains, mirrors, lighting and accessories delivered across Kenya.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} ${poppins.variable} font-body bg-white text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
