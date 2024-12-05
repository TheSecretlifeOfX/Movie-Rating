"use client";

import React, { useState, useEffect } from "react";

// Define the type for movies
interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]); // State to store movies
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const API_URL = "https://moviesdatabase.p.rapidapi.com/titles";
  const API_OPTIONS = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9fdf7fc087msh47597c2b0f97da9p1ae2cbjsn3dcc4a7f3a4b",
      "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
    },
  };

  // Fetch movies on component mount
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const response = await fetch(API_URL, API_OPTIONS);
        const data = await response.json();

        if (data.results) {
          // Format the movies to match the desired structure
          const formattedMovies = data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.titleText?.text || "No Title",
            year: movie.releaseYear?.year || "N/A",
            poster:
              movie.primaryImage?.url || "https://via.placeholder.com/300x400.png",
          }));
          setMovies(formattedMovies);
        } else {
          setError("No movies found.");
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-purple-500 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Movie List</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading movies...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-sm text-gray-600">Year: {movie.year}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
