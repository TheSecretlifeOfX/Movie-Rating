import React from 'react';

export default function topPage() {
  return (
    <div id="Top" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-[200%] h-[200%] bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-30 animate-move-background"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
        <h1 className="text-5xl font-bold mb-8">Welcome to Movie Galaxy</h1>
        <p className="text-lg mb-8 max-w-2xl">
          Explore a collection of the most exciting movies with a stunning slideshow and animated visuals!
        </p>

        {/* Movie Slideshow */}
        <div className="relative w-[90%] max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
          <div className="flex animate-slide">
            <div className="w-full flex-shrink-0">
              <img
                src="/images/movie1.jpg"
                alt="Movie 1"
                className="w-full h-60 object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0">
              <img
                src="/images/movie2.jpg"
                alt="Movie 2"
                className="w-full h-60 object-cover"
              />
            </div>
            <div className="w-full flex-shrink-0">
              <img
                src="/images/movie3.jpg"
                alt="Movie 3"
                className="w-full h-60 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
