import React from 'react';
import TopPage from './components/TopPage';
import About from './components/About';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <TopPage />
      <About />
    </main>
  );
}
