import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function NavBar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query); // Call the onSearch function passed from parent component
    setQuery('');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-2 px-6 flex justify-between items-center z-50 shadow-md">
      {/* Left: Navigation Links */}
      <div className="flex space-x-6">
        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link href="/movies" className="hover:text-gray-400">
          Movies
        </Link>
        <a href="#about" className="hover:text-gray-400">
          About
        </a>
      </div>

      {/* Right: Search Bar */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="pl-4 pr-10 py-2 bg-gray-700 text-white rounded-full outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
}
