'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Use this instead of useRouter

interface MovieDetail {
  title: string;
  year: string;
  poster: string;
  plot: string; // Add more fields as needed
  genre: string;
  director: string;
  actors: string;
}

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const movieId = searchParams.get("id"); // Extract `id` from query string
  
  const OMDB_API_KEY = "dfce1fa4"; // Replace with your actual OMDb API key

  useEffect(() => {
    if (!movieId) return; // Wait for the `id` to be available

    const fetchMovieDetails = async () => {
      setLoading(true);
      const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${OMDB_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
          const formattedMovie: MovieDetail = {
            title: data.Title,
            year: data.Year,
            poster: data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x400.png",
            plot: data.Plot || "No plot information available",
            genre: data.Genre || "N/A",
            director: data.Director || "N/A",
            actors: data.Actors || "N/A",
          };
          setMovie(formattedMovie);
        } else {
          console.error("Movie not found:", data.Error);
          setMovie(null); // Handle movie not found
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading movie details...</p>
      ) : movie ? (
        <div className="movie-detail flex flex-col items-center">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-64 h-auto rounded-lg shadow-lg mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-700 mb-4">
            <strong>Year:</strong> {movie.year}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Actors:</strong> {movie.actors}
          </p>
          <p className="text-gray-700">
            <strong>Plot:</strong> {movie.plot}
          </p>
        </div>
      ) : (
        <p className="text-center text-red-500">Movie not found</p>
      )}
    </div>
  );
};

export default MovieDetailPage;
