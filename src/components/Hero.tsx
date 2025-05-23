
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Hero = () => {
  return (
    <div className="relative">
      <AspectRatio ratio={16 / 5}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 z-0"></div>
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Concert crowd"
          className="object-cover w-full h-full mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            Discover & Book Amazing Events
          </h1>
          <p className="text-lg md:text-xl mt-4 text-center max-w-2xl">
            From concerts and movies to sports and workshops - find and book tickets to your favorite events
          </p>
        </div>
      </AspectRatio>
    </div>
  );
};

export default Hero;
