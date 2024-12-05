import React from 'react';

export default function NavBar() {
  return (
    <nav className="w-full bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      {/* Left: Navigation Links */}
      <div className="flex space-x-6">
        <a href="#home" className="hover:text-gray-400">
          Home
        </a>
        <a href="#movies" className="hover:text-gray-400">
          Movies
        </a>
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
