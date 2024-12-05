'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface MovieDetail {
  title: string;
  year: string;
  poster: string;
  plot: string;
}

const MovieDetailPage = () => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [submittedFeedback, setSubmittedFeedback] = useState<{ rating: number; comment: string } | null>(null);

  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  const OMDB_API_KEY = "dfce1fa4";

  useEffect(() => {
    if (!movieId) return;

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

  const handleRatingSubmit = () => {
    if (rating && comment) {
      setSubmittedFeedback({ rating, comment });
      alert("Feedback submitted successfully!");
      setRating(null);
      setComment('');
    } else {
      alert("Please provide both a rating and a comment.");
    }
  };

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
            <strong>Plot:</strong> {movie.plot}
          </p>

          <div className="feedback-section mt-6">
            <h2 className="text-2xl font-bold mb-4">Leave Your Feedback</h2>
            <div className="mb-4">
  <label
    htmlFor="rating"
    className="block text-gray-700 font-semibold mb-2"
  >
    Rating (1-5):
  </label>
  <select
    id="rating" // Associate the label with this select element using the id
    className="border border-gray-300 rounded px-4 py-2 w-full"
    value={rating || ''}
    onChange={(e) => setRating(Number(e.target.value))}
  >
    <option value="" disabled>
      Select a rating
    </option>
    {[1, 2, 3, 4, 5].map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </select>
</div>


            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Comment:
              </label>
              <textarea
                className="border border-gray-300 rounded px-4 py-2 w-full"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button
              onClick={handleRatingSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Submit Feedback
            </button>
          </div>

          {submittedFeedback && (
            <div className="submitted-feedback mt-6">
              <h3 className="text-xl font-bold mb-2">Your Feedback</h3>
              <p className="text-gray-700">
                <strong>Rating:</strong> {submittedFeedback.rating}
              </p>
              <p className="text-gray-700">
                <strong>Comment:</strong> {submittedFeedback.comment}
              </p>
            </div>
          )}

          <Link href="/" className="mt-6 text-blue-500 underline">
            Back to Movies List
          </Link>
        </div>
      ) : (
        <p className="text-center text-red-500">Movie not found</p>
      )}
    </div>
  );
};

export default MovieDetailPage;
