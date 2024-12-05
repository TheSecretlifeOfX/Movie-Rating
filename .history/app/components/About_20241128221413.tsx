import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div id="about" className="grid grid-cols-3 grid-rows-12 gap-4 h-screen w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500  p-4">
      {/* First Column: About Me Text */}
      <div className="col-span-1 row-span-12 flex items-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg leading-relaxed">
            I am a passionate developer with a keen interest in creating dynamic 
            and engaging web applications. I enjoy solving complex problems and 
            turning ideas into reality through code.
          </p>
        </div>
      </div>

      {/* Second Column: Image */}
      <div className="col-span-1 row-span-12 flex items-center justify-top bg-white">
        <Image
          src="/images/DSC_1037.JPG"
          alt="About Me"
          width={300}
          height={400}
          className=" object-cover shadow-lg"
        />
      </div>

      {/* Third Column: Image with Text Below and Beside */}
      <div className="col-span-1 row-span-12 flex flex-col items-center">
        <Image
          src="/images/ideas.jpg"
          alt="Idea"
          width={300}
          height={300}
          className="rounded-lg object-cover shadow-md"
        />
        <div className="mt-4 text-center text-white">
          <p className="text-lg font-semibold">Turning ideas into reality</p>
          <p className="text-sm text-white mt-2">
            Exploring innovative solutions to bring creative concepts to life.
          </p>
        </div>
      </div>
    </div>
  );
}
