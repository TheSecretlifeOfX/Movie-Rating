'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link to navigate between pages

interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // Movies state
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const API_KEY = "9fdf7fc087msh47597c2b0f97da9p1ae2cbjsn3dcc4a7f3a4b"; // RapidAPI key

  // Fetch movies based on the current page
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const url = `https://moviesdatabase.p.rapidapi.com/titles?page=${currentPage}&limit=10`; // Added pagination with page and limit
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
        const formattedMovies = data.results.map((item: any) => ({
          id: item.id,
          title: item.titleText.text,
          year: item.releaseYear?.year || "N/A",
          poster: item.primaryImage?.url || "https://via.placeholder.com/300x400.png",
        }));
        setMovies(formattedMovies);

        // Assuming the API response provides the total number of pages
        setTotalPages(data.totalPages || 1); // Update total pages if available
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]); // Re-fetch when currentPage changes

  // Handle the "Next" button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Go to the next page
    }
  };

  // Handle the "Previous" button click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to the previous page
    }
  };

  return (
    <div>
      <h1>Movies List</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div>
          {/* Movie List */}
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <Link href={`/movies/${movie.id}`}>
                <a>
                  <img src={movie.poster} alt={movie.title} />
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                </a>
              </Link>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-700"}`}
            >
              Previous
            </button>

            <span className="page-info text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-700"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesListPage;
