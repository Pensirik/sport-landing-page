import React from 'react';
import Athlets from './Athlets';
import Player from './Player';

const AlthletsPlayerDestop = () => {
  return (
    <div className="w-full relative hidden md:block">
      <Athlets />
      <Player />
    </div>
  );
};

export default AlthletsPlayerDestop;
