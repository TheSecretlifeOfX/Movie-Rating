"use client";

import React, { useState, useEffect } from 'react';

// Define the type for movie objects
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]); // Use the Movie[] type for the movies state
  const [loading, setLoading] = useState(true); // Loading state
  const API_KEY = "dfce1fa4"; // Replace with your OMDb API key

  useEffect(() => {
    // Fetch movies data from the API
    async function fetchMovies() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=batman&apikey=${API_KEY}` // Example query to fetch a list of movies
        );
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search); // `Search` is the array of movies from OMDb
        } else {
          console.error('Error fetching movies:', data.Error);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
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

      {/* Movie List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="bg-white shadow-md rounded-lg p-4">
              {/* Movie Poster */}
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400.png"} // Use a placeholder image if Poster is "N/A"
                alt={movie.Title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              {/* Movie Details */}
              <h3 className="text-xl font-semibold mb-2">{movie.Title}</h3>
              <p className="text-gray-700 text-sm mb-4">Year: {movie.Year}</p>

              {/* Rating Section */}
              <div className="mb-4">
                <p className="text-gray-800 font-medium">Rating:</p>
                <p className="text-yellow-500">N/A (Example Placeholder)</p>
              </div>

              {/* Comments Section */}
              <div>
                <p className="text-gray-800 font-medium mb-2">Comments:</p>
                <p className="text-gray-500 text-sm">No comments yet.</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No movies found.</p>
      )}
    </main>
  );
}
