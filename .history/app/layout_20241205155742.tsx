'use client';
import { useRouter } from 'next/navigation'; // Import useRouter
import localFont from 'next/font/local';
import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { useState } from 'react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter(); // Initialize useRouter for navigation
  const [, setSearchQuery] = useState(''); // State to hold the search query

  // Handle the search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update the local search state (optional)
    router.push(`/movies?search=${encodeURIComponent(query)}`); // Navigate to the Movies page with the search query
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav>
          {/* Pass the handleSearch function to NavBar */}
          <NavBar onSearch={handleSearch} />
        </nav>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
