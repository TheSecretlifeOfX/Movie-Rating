'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const movieId = router.query.id;

  const OMDB_API_KEY = "dfce1fa4"; 

  useEffect(() => {
    // Ensure router is available
    if (!movieId || !router.isReady) return; // Check if `router` and `movieId` are available

    const fetchMovieDetails = async () => {
      setLoading(true);
      const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${OMDB_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
          setMovie({
            title: data.Title,
            year: data.Year,
            poster: data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x400.png",
            plot: data.Plot || "No plot information available",
            genre: data.Genre || "N/A",
            director: data.Director || "N/A",
            actors: data.Actors || "N/A",
          });
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, router.isReady]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found or an error occurred.</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.year}</p>
      <img src={movie.poster} alt={movie.title} />
      <p>{movie.plot}</p>
      {/* Other movie details... */}
    </div>
  );
};

export default MovieDetailPage;
