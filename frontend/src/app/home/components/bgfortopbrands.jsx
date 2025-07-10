import React from 'react';

const Bgfortopbrands = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none rounded-xl"
    >
      <source src="/videobg2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Bgfortopbrands;
