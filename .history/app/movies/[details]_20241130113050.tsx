// pages/movies/[id].tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // For accessing dynamic routes

interface MovieDetail {
  title: string;
  year: string;
  poster: string;
  description: string; // Add more fields as needed
}

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const { query } = useRouter(); // Extract the `id` from the URL
  const movieId = query.id; // This will be the dynamic `id` parameter

  useEffect(() => {
    if (!movieId) return; // Wait for the `id` to be available

    const fetchMovieDetails = async () => {
      setLoading(true);
      const url = `https://moviesdatabase.p.rapidapi.com/titles/${movieId}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "9fdf7fc087msh47597c2b0f97da9p1ae2cbjsn3dcc4a7f3a4b", // RapidAPI key
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const formattedMovie: MovieDetail = {
          title: data.titleText.text,
          year: data.releaseYear?.year || "N/A",
          poster: data.primaryImage?.url || "https://via.placeholder.com/300x400.png",
          description: data.plotText?.text || "No description available",
        };
        setMovie(formattedMovie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      {loading ? (
        <p>Loading movie details...</p>
      ) : movie ? (
        <div className="movie-detail">
          <img src={movie.poster} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>Year: {movie.year}</p>
          <p>{movie.description}</p>
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  );
};

export default MovieDetailPage;
