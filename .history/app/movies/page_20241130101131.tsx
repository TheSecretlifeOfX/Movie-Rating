"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

// Define the type for movie objects
interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]); // Movies state
  const [loading, setLoading] = useState(false); // Loading state
  const [query, setQuery] = useState(""); // No default search query
  const [page, setPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages available
  const API_KEY = "9fdf7fc087msh47597c2b0f97da9p1ae2cbjsn3dcc4a7f3a4b"; // RapidAPI key

  // Fetch movies based on the query and page
  useEffect(() => {
    if (!query) return; // Prevent fetching if no query is set

    async function fetchMovies() {
      setLoading(true); // Set loading state to true when fetching
      const url = `https://moviesdatabase.p.rapidapi.com/titles?title=${query}&page=${page}`; // Replace with the correct parameter
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.results) {
          // Map the data to fit the `Movie` interface
          const formattedMovies = data.results.map((item: any) => ({
            id: item.id,
            title: item.titleText.text,
            year: item.releaseYear?.year || "N/A",
            poster:
              item.primaryImage?.url || "https://via.placeholder.com/300x400.png",
          }));

          setMovies(formattedMovies);

          // Update the total number of pages if available in the response
          setTotalPages(data.totalPages || 1);
        } else {
          console.error("Error fetching movies:", data.error);
          setMovies([]); // If no results, clear the movies state
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]); // If fetch fails, clear the movies state
      } finally {
        setLoading(false); // Set loading state to false when fetching is complete
      }
    }

    fetchMovies();
  }, [query, page]); // Run the effect when the query or page changes

  // Handle search term change
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery); // Update the search query
    setPage(1); // Reset to the first page when a new query is made
  };

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div>
      {/* Navbar component */}
      <NavBar onSearch={handleSearch} />

      <main className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-left underline mt-10 mb-8">
          MOVIES
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading movies...</p>
        ) : movies.length > 0 ? (
          <div>
            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">Year: {movie.year}</p>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className={`px-4 py-2 rounded-full ${
                  page === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-700"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-full ${
                  page === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-700"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : query ? (
          <p className="text-center text-gray-500">No movies found.</p>
        ) : (
          <p className="text-center text-gray-500">
            Please enter a search query to find movies.
          </p>
        )}
      </main>
    </div>
  );
}
