// 'use client';
// import React, { useState, useEffect } from "react";
// import Link from "next/link"; // Import Link to navigate between pages

// interface Movie {
//   id: string;
//   title: string;
//   year: string;
//   poster: string;
// }

// const MoviesListPage = () => {
//   const [movies, setMovies] = useState<Movie[]>([]); // Movies state
//   const [loading, setLoading] = useState(false); // Loading state
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const [totalPages, setTotalPages] = useState(1); // State for total pages
//   const [searchQuery, setSearchQuery] = useState(''); // State for the search query
//   const API_KEY = "9fdf7fc087msh47597c2b0f97da9p1ae2cbjsn3dcc4a7f3a4b"; // RapidAPI key

//   // Fetch movies based on the current page and search query
//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       // If there's a search query, include it in the URL
//       const url = `https://moviesdatabase.p.rapidapi.com/titles?page=${currentPage}&limit=10${searchQuery ? `&search=${searchQuery}` : ''}`;

//       console.log('Fetching URL:', url);  // Debugging: log the API URL

//       const options = {
//         method: "GET",
//         headers: {
//           "x-rapidapi-key": API_KEY,
//           "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
//         },
//       };

//       try {
//         const response = await fetch(url, options);

//         // Log the response status for debugging
//         console.log('API Response Status:', response.status);

//         if (!response.ok) {
//           throw new Error('Failed to fetch data from API');
//         }

//         const data = await response.json();

//         // Debugging: log the entire API response data
//         console.log('API Response Data:', data);

//         // Check if the response has the expected format
//         if (data && data.results && Array.isArray(data.results)) {
//           const formattedMovies = data.results.map((item: any) => ({
//             id: item.id,
//             title: item.titleText.text,
//             year: item.releaseYear?.year || "N/A",
//             poster: item.primaryImage?.url || "https://via.placeholder.com/300x400.png",
//           }));
//           setMovies(formattedMovies);
//           setTotalPages(data.totalPages || 1);
//         } else {
//           console.error('Invalid data format: Expected "results" array');
//           console.log('API Response Structure:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching movies:', error);  // Debugging: log any errors
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [currentPage, searchQuery]); // Re-fetch when currentPage or searchQuery changes

//   // Handle the "Next" button click
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1); // Go to the next page
//     }
//   };

//   // Handle the "Previous" button click
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1); // Go to the previous page
//     }
//   };

//   // Handle search input change
//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1); // Reset to page 1 when the search term changes
//   };

//   // Handle search form submit (optional, if you want to use a form)
//   const handleSearchSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     setCurrentPage(1); // Reset to page 1 when submitting the search form
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-8">Movies List</h1>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <form onSubmit={handleSearchSubmit}>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder="Search for movies..."
//             className="w-full p-2 border rounded-md"
//           />
//         </form>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading movies...</p>
//       ) : (
//         <div>
//           {/* Movie Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {movies.map((movie) => (
//               <div key={movie.id} className="movie-item bg-white shadow-lg rounded-lg overflow-hidden">
//                 <Link href={`/movies/${movie.id}`}>
//                   <img
//                     src={movie.poster}
//                     alt={movie.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold">{movie.title}</h3>
//                     <p className="text-gray-500 text-sm">Year: {movie.year}</p>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center items-center mt-8 space-x-4">
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               className={`px-6 py-2 rounded-full ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-700"}`}
//             >
//               Previous
//             </button>

//             <span className="text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-6 py-2 rounded-full ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-700"}`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MoviesListPage;
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
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [error, setError] = useState<string>(''); // Error state to display messages
  
  // OMDb API Key
  const OMDB_API_KEY = "dfce1fa4"; // Replace with your OMDb API key

  // Fetch movies based on the current page and search query
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(''); // Reset any previous error messages

      let url = '';

      // If there is a search query, use OMDb API to search movies by title
      if (searchQuery) {
        url = `https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&page=${currentPage}&apikey=${OMDB_API_KEY}`;
      } else {
        // Otherwise, fetch a default set of movies (or empty if search is not active)
        url = `https://www.omdbapi.com/?s=batman&page=${currentPage}&apikey=${OMDB_API_KEY}`;
      }

      console.log('Fetching URL:', url);  // Debugging: log the API URL

      try {
        const response = await fetch(url);

        // Log the response status for debugging
        console.log('API Response Status:', response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch data from OMDb API');
        }

        const data = await response.json();

        // Debugging: log the entire API response data
        console.log('API Response Data:', data);

        // Check if the response contains movies in the 'Search' array
        if (data && data.Search && Array.isArray(data.Search)) {
          const formattedMovies = data.Search.map((item: any) => ({
            id: item.imdbID, // Use IMDb ID for the movie
            title: item.Title,
            year: item.Year,
            poster: item.Poster || "https://via.placeholder.com/300x400.png",
          }));
          setMovies(formattedMovies);
          setTotalPages(Math.ceil(data.totalResults / 10)); // OMDb doesn't return totalPages, but you can calculate it
        } else {
          // If no results or unexpected format, show an error
          setError('No movie results found or unexpected data format.');
          console.log('API Response Structure:', data);
        }
      } catch (error) {
        // Log and set the error message
        console.error('Error fetching movies:', error);
        setError('Error fetching movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]); // Re-fetch when currentPage or searchQuery changes

  // Handle the "Next" button click
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Go to the next page
  };

  // Handle the "Previous" button click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to the previous page
    }
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to page 1 when the search term changes
  };

  // Handle search form submit (optional, if you want to use a form)
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to page 1 when submitting the search form
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Movies List</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for movies..."
            className="w-full p-2 border rounded-md"
          />
        </form>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          {/* Movie Grid */}
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

          {/* Pagination Controls */}
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