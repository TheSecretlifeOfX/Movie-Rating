import React from 'react';
import Link from 'next/link'
export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center z-50 shadow-md">
      {/* Left: Navigation Links */}
      <div className="flex space-x-6">
        <link href="/" className="hover:text-gray-400">
          Home
        </link>
        <link href="/movies" className="hover:text-gray-400">
          Movies
        </link>
        <a href="#about" className="hover:text-gray-400">
          About
        </a>
      </div>

      {/* Right: Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="pl-4 pr-10 py-2 bg-gray-700 text-white rounded-full outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          🔍
        </button>
      </div>
    </nav>
  );
}
