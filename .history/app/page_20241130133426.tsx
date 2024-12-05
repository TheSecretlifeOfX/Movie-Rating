// import React from 'react';
// import TopPage from './components/TopPage';
// import About from './components/About';

// export default function Page() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
//       <TopPage />
//       <About />
//     </main>
//   );
// }
import React, { useState } from 'react';
import TopPage from './components/TopPage';
import About from './components/About';
import NavBar from './components/NavBar';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <NavBar onSearch={handleSearch} />
      <TopPage />
      <About />
    </main>
  );
}
