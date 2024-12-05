"use client";

import React, { useState, useEffect } from 'react';
import NavBar from "./components/NavBar"

// Define the type for movie objects
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]); // Movies state
  const [loading, setLoading] = useState(true); // Loading state
  const [query, setQuery] = useState('superman'); // Default search query (e.g., 'superman')
  const API_KEY = "dfce1fa4"; // Replace with your OMDb API key

  // Fetch movies based on the query
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true); // Set loading state to true when fetching
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
        );
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search); // Set the movies from the API response
        } else {
          console.error('Error fetching movies:', data.Error);
          setMovies([]); // If no search results, clear the movies state
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]); // If fetch fails, clear the movies state
      } finally {
        setLoading(false); // Set loading state to false when fetching is complete
      }
    }

    fetchMovies();
  }, [query]); // Run the effect when the query changes

  // Handle search term change
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery); // Update the search query
  };

  return (
    <div>
      {/* Navbar component */}
      <NavBar onSearch={handleSearch} />
      
      <main className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-left underline mt-10 mb-8">MOVIES</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading movies...</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400.png"}
                  alt={movie.Title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{movie.Title}</h3>
                <p className="text-gray-700 text-sm mb-4">Year: {movie.Year}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No movies found.</p>
        )}
      </main>
    </div>
  );
}
