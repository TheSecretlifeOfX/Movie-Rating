'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'; // Import to access query params
import Link from "next/link";

interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
}

const MoviesListPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>('');
  
  const router = useRouter(); // Router to access the URL query parameters
  const searchQuery = router.query.search || ''; // Get the search query from the URL query parameters
  
  // OMDb API Key
  const OMDB_API_KEY = "dfce1fa4";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');

      let url = '';

      if (searchQuery) {
        url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&page=${currentPage}&apikey=${OMDB_API_KEY}`;
      } else {
        url = `https://www.omdbapi.com/?s=batman&page=${currentPage}&apikey=${OMDB_API_KEY}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data from OMDb API');
        }

        const data = await response.json();

        if (data && data.Search && Array.isArray(data.Search)) {
          const formattedMovies = data.Search.map((item: any) => ({
            id: item.imdbID,
            title: item.Title,
            year: item.Year,
            poster: item.Poster || "https://via.placeholder.com/300x400.png",
          }));
          setMovies(formattedMovies);
          setTotalPages(Math.ceil(data.totalResults / 10));
        } else {
          setError('No movie results found or unexpected data format.');
        }
      } catch (error) {
        setError('Error fetching movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Movies List</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-item bg-white shadow-lg rounded-lg overflow-hidden">
                <Link href={`/movies/${movie.id}`}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <p className="text-gray-500 text-sm">Year: {movie.year}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-full ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-700"}`}
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-6 py-2 rounded-full ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-700"}`}
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