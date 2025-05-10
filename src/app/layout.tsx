import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// import Header from '@/components/layout/Header'; // Header removed
import BottomNav from '@/components/layout/BottomNav';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SwasthyaKhoj Simplified',
  description: 'Find nearby hospitals, medical stores, and book appointments in rural India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen bg-background">
          {/* <Header /> Removed Header */}
          <main className="flex-grow pb-20 md:pb-6"> {/* Adjusted padding */}
            {children}
          </main>
          <BottomNav />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
