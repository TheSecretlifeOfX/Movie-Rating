'use client';

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  id: string;
  title: string;
  year: string;
  poster: string;
}

const MoviesContent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>("");

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const OMDB_API_KEY = "dfce1fa4";

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Fetch movies after currentPage or searchQuery changes
  useEffect(() => {
    const randomSearchTerms = [
      "superman",
      "inception",
      "avengers",
      "matrix",
      "toy story",
      "pirates",
      "frozen",
      "jurassic",
      "harry potter",
      "spiderman",
    ];

    const getRandomSearchTerm = () => {
      const randomIndex = Math.floor(Math.random() * randomSearchTerms.length);
      return randomSearchTerms[randomIndex];
    };

    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      const query = searchQuery || getRandomSearchTerm();
      const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${currentPage}&apikey=${OMDB_API_KEY}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data from OMDb API");
        }

        const data = await response.json();

        if (data.Response === "False") {
          setError(data.Error || "No results found.");
          setMovies([]);
        } else if (data.Search && Array.isArray(data.Search)) {
          const formattedMovies: Movie[] = data.Search.map((item: Movie) => ({
            id: item.imdbID,
            title: item.Title,
            year: item.Year,
            poster: item.Poster !== "N/A" ? item.Poster : "https://via.placeholder.com/300x400.png",
          }));
          setMovies(formattedMovies);
          setTotalPages(Math.ceil(data.totalResults / 10));
        } else {
          setError("Unexpected data format.");
          setMovies([]);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error fetching movies. Please try again later.");
        }
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]); // Removed getRandomSearchTerm from dependencies since it's now inside useEffect

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-96">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                    <p className="text-gray-600">{movie.year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {movies.length > 0 && (
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="py-2">Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Wrap the main component with Suspense
const MoviesListPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <MoviesContent />
    </Suspense>
  );
};

export default MoviesListPage;
