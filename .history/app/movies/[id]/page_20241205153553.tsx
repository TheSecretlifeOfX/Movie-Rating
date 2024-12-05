'use client';

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from 'next/image';

interface MovieDetail {
  title: string;
  year: string;
  poster: string;
  plot: string;
  genre: string;
  director: string;
  actors: string;
}

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const { id: movieId } = useParams(); // Get the dynamic `id` from the URL

  const OMDB_API_KEY = "dfce1fa4";

  useEffect(() => {
    if (!movieId) {
      console.log("Movie ID is not available.");
      return;
    }

    const fetchMovieDetails = async () => {
      setLoading(true);
      const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${OMDB_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Movie Data:", data);

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
          console.error("Movie not found:", data.Error);
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleSubmit = () => {
    if (rating !== null && comment.trim() !== "") {
      console.log("Rating:", rating);
      console.log("Comment:", comment);
      setSubmitted(true);
    } else {
      alert("Please provide a rating and a comment.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading movie details...</p>;
  }

  if (!movie) {
    return <p className="text-center text-red-500">Movie not found.</p>;
  }

  return (
    <div className="container mt-10 pt-10 mx-auto p-6">
      <div className="movie-detail flex flex-col items-center">
        <Image
          src={movie.poster}
          alt={movie.title}
          width={500}
          height={750}
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

      {/* Rating and Comment Section */}
      <div className="mt-10 bg-gray-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 pb-4 pt-4 text-center bg-gray-400 rounded-lg text-gray-700">Rate and Comment</h2>
        {submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg">
            <p>Thank you for your feedback!</p>
            <p>
              <strong>Your Rating:</strong> {rating}/10
            </p>
            <p>
              <strong>Your Comment:</strong> {comment}
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-gray-700 font-semibold mb-2 ml-5"
              >
                Rating (1 to 10):
              </label>
              <select
                id="rating"
                className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200"
                value={rating || ""}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select a rating
                </option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="comment"
                className="block text-gray-700 font-semibold mb-2 ml-5"
              >
                Comment:
              </label>
              <textarea
                id="comment"
                className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
              ></textarea>
            </div>
            <div className="mb-3 pb-3 text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-gray-500 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
