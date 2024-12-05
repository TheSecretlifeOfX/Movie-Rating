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
  const API_KEY = "9fdf7fc087msh47597c2b0f97da9p1ae2cbjsn3dcc4a7f3a4b"; // RapidAPI key

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const url = `https://moviesdatabase.p.rapidapi.com/titles?limit=10`;
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
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default MoviesListPage;
