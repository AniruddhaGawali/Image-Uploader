import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const jost = Jost({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Image Uploader',
  description: 'Upload images and share them with others.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
