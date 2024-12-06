import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div id="about" className="min-h-screen w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          {/* First Column: About Me Text */}
          <div className="bg-purple-600/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
              <p className="text-base md:text-lg leading-relaxed">
                I am a passionate developer with a keen interest in creating dynamic 
                and engaging web applications. I enjoy solving complex problems and 
                turning ideas into reality through code.
              </p>
            </div>
          </div>

          {/* Second Column: Journey */}
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex flex-col h-full justify-between space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">About the Journey</h2>
                <p className="text-gray-700 text-sm md:text-base">
                  A snapshot of memories and milestones that shape who I am today.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full aspect-[3/4] max-w-[300px]">
                  <Image
                    src="/Images/DSC_1037.JPG"
                    alt="About Me"
                    fill
                    className="object-cover shadow-lg rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Third Column: Ideas */}
          <div className="bg-red-500/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex flex-col h-full justify-between space-y-6">
              <div className="relative w-full aspect-square max-w-[300px] mx-auto">
                <Image
                  src="/Images/ideas.jpg"
                  alt="Idea"
                  fill
                  className="rounded-lg object-cover shadow-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="text-center text-white">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">Innovation & Creativity</h3>
                <p className="text-base md:text-lg">Turning ideas into reality through code and design.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((skill) => (
              <div key={skill} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-white text-center font-semibold">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
