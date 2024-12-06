import React from 'react';
import Image from 'next/image';

export default function TopPage() {
  return (
    <div id="Top" className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-30"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4 py-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">Welcome to Movie Galaxy</h1>
        <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl">
          Explore a collection of the most exciting movies with a stunning slideshow and animated visuals!
        </p>

        {/* Movie Slideshow */}
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg">
          <div className="flex animate-slide">
            {/* First Set */}
            <div className="w-full md:w-[33%] h-[50vh] md:h-[40vh] flex-shrink-0 px-2">
              <div className="relative w-full h-full">
                <Image
                  src="/TopImages/avengers.jpeg"
                  alt="Movie 1"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-[33%] h-[50vh] md:h-[40vh] flex-shrink-0 px-2">
              <div className="relative w-full h-full">
                <Image
                  src="/TopImages/transformer1.jpeg"
                  alt="Movie 2"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-[33%] h-[50vh] md:h-[40vh] flex-shrink-0 px-2">
              <div className="relative w-full h-full">
                <Image
                  src="/TopImages/wildRobot.jpeg"
                  alt="Movie 3"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>

            {/* Duplicate Set for Infinite Loop */}
            <div className="w-full md:w-[33%] h-[50vh] md:h-[40vh] flex-shrink-0 px-2">
              <div className="relative w-full h-full">
                <Image
                  src="/TopImages/avengers.jpeg"
                  alt="Movie 1"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="w-full md:w-[33%] h-[50vh] md:h-[40vh] flex-shrink-0 px-2">
              <div className="relative w-full h-full">
                <Image
                  src="/TopImages/transformer1.jpeg"
                  alt="Movie 2"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="w-full md:w-[33%] h-[50vh] md:h-[40vh] flex-shrink-0 px-2">
              <div className="relative w-full h-full">
                <Image
                  src="/TopImages/wildRobot.jpeg"
                  alt="Movie 3"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-300%);
          }
        }

        .animate-slide {
          animation: slide 30s linear infinite;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-slide {
            animation-duration: 20s;
          }
        }
      `}</style>
    </div>
  );
}
