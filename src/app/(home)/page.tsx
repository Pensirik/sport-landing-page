'use client';

import React from 'react';
import AthletsPlayerMobile from '@/components/home/AthletsPlayerMobile';
import AlthletsPlayerDestop from '@/components/home/AlthletsPlayerDestop';

export default function Page() {
  return (
    <div className="mx-auto flex flex-col">
      <AlthletsPlayerDestop />
      <AthletsPlayerMobile />
    </div>
  );
}
