import React from 'react';
import Image from 'next/image';

const movieSlides = [
  { src: '/TopImages/avengers.jpeg', alt: 'Movie 1' },
  { src: '/TopImages/transformer1.jpeg', alt: 'Movie 2' },
  { src: '/TopImages/wildRobot.jpeg', alt: 'Movie 3' },
];

export default function TopPage() {
  return (
    <div id="Top" className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-30"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 py-8 mt-10 pt-5">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">Welcome to Movie Galaxy</h1>
        <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl">
          Explore a collection of the most exciting movies with a stunning slideshow and animated visuals!
        </p>

        {/* Movie Slideshow */}
        <div className="slideshow-container relative w-full max-w-6xl mx-auto rounded-lg shadow-lg">
          <div className="animate-slide">
            {/* First Set */}
            {movieSlides.map((slide, index) => (
              <div key={`slide-1-${index}`} className="slide-item px-2">
                <div className="relative w-full h-[50vh] md:h-[40vh]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 3}
                  />
                </div>
              </div>
            ))}

            {/* Duplicate Set for Infinite Loop */}
            {movieSlides.map((slide, index) => (
              <div key={`slide-2-${index}`} className="slide-item px-2">
                <div className="relative w-full h-[50vh] md:h-[40vh]">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
