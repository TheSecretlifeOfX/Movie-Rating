import React from 'react';
import Image from 'next/image';

export default function TopPage() {
  return (
    <div id="Top" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-30"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
        <h1 className="text-5xl font-bold mb-8">Welcome to Movie Galaxy</h1>
        <p className="text-lg mb-8 max-w-2xl">
          Explore a collection of the most exciting movies with a stunning slideshow and animated visuals!
        </p>

        {/* Movie Slideshow */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
          <div className="relative w-full flex animate-slide">
            {/* Image 1 */}
            <div className="w-[27%] h-[40vh] flex-shrink-0">
              <Image
                src="/TopImages/avengers.jpeg"
                alt="Movie 1"
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                layout="intrinsic"
                width={270}   // 27% width of container
                height={400}  // 40% height of container
              />
            </div>
            {/* Image 2 */}
            <div className="w-[27%] h-[40vh] flex-shrink-0">
              <Image
                src="/TopImages/transformer1.jpeg"
                alt="Movie 2"
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                layout="intrinsic"
                width={270}   // 27% width of container
                height={400}  // 40% height of container
              />
            </div>
            {/* Image 3 */}
            <div className="w-[27%] h-[40vh] flex-shrink-0">
              <Image
                src="/TopImages/wildRobot.jpeg"
                alt="Movie 3"
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                layout="intrinsic"
                width={270}   // 27% width of container
                height={400}  // 40% height of container
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
