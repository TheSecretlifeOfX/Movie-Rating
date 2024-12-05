"use client";

import React, { useState, useEffect } from 'react';

export default function Page() {
  const [movies, setMovies] = useState([]); // State to hold movies data

  useEffect(() => {
    // Fetch movies data from an API
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies'); // Replace with your API endpoint
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-right mt-10 mb-8">MOVIES</h1>

      {/* Movie List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-white shadow-md rounded-lg p-4">
              {/* Movie Details */}
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{movie.description}</p>

              {/* Rating Section */}
              <div className="mb-4">
                <p className="text-gray-800 font-medium">Rating:</p>
                <p className="text-yellow-500">{movie.rating || 'Not rated yet'}</p>
              </div>

              {/* Comments Section */}
              <div>
                <p className="text-gray-800 font-medium mb-2">Comments:</p>
                {movie.comments && movie.comments.length > 0 ? (
                  <ul className="space-y-2">
                    {movie.comments.map((comment, index) => (
                      <li key={index} className="text-gray-700 text-sm">
                        - {comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading movies...</p>
        )}
      </div>
    </main>
  );
}
