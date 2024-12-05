"use client";

import React, { useState, useEffect } from "react";

// Define the type for movie objects
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]); // Movie list state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const API_KEY = "dfce1fa4"; // Replace with your OMDb API key

  useEffect(() => {
    async function fetchMovies() {
      const allMovies: Movie[] = []; // Array to store all fetched movies
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // Letters for search queries

      try {
        for (const letter of alphabet) {
          const response = await fetch(
            `http://www.omdbapi.com/?s=${letter}&apikey=${API_KEY}` // Search by each letter
          );
          const data = await response.json();

          if (data.Response === "True") {
            allMovies.push(...data.Search); // Append results to the movies array
          } else {
            console.warn(`No movies found for query "${letter}"`);
          }
        }
        setMovies(allMovies); // Set the fetched movies
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-left underline mt-10 mb-8">MOVIES</h1>

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Movie List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="bg-white shadow-md rounded-lg p-4">
              {/* Movie Poster */}
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400.png?text=No+Image"} // Use placeholder if no Poster
                alt={movie.Title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {/* Movie Details */}
              <h3 className="text-xl font-semibold mb-2">{movie.Title}</h3>
              <p className="text-gray-700 text-sm mb-4">Year: {movie.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No movies found.</p>
      )}
    </main>
  );
}