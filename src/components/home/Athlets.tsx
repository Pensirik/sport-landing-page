'use client';

import React from 'react';
import TextNumber from './TextNumber';
import { ATHLETS } from '@/constants/text';

const Athlets: React.FC = () => {
  return (
    <div>
      <img src="/images/graphic-desktop.png" className="hidden xl:block top-[35px] left-0 2xl:left-[175px] absolute z-50" alt="player1" />
      <img src="/images/graphic-tablet.png" className="xl:hidden md:block top-[120px] left-0  absolute z-50" alt="player1" />
      <div className="flex flex-col w-full h-full">
        <section className="w-full flex bg-white ">
          <div className="md:w-2/6 xl:w-1/2" />
          <div className="md:w-4/6 xl:w-1/2 px-10">
            <h1 className="header md:mt-[87px] xl:mt-[24px] leading-[105.47px]">ATHLETS</h1>
          </div>
        </section>
        <section className="w-full flex">
          <div className="md:w-2/6 xl:w-1/2" />
          <div className="md:w-4/6 xl:w-1/2 px-10">
            <div className="flex md:pt-[36px] xl:pt-[59px] md:pb-[21px] xl:pb-[31px] items-center">
              <TextNumber number="01" />
              <h1 className="title pl-[10px]">{ATHLETS[0].TITLE}</h1>
            </div>
            <p className="detail md:pb-[30px] xl:pb-[56px] text-black">{ATHLETS[0].DETAIL}</p>
          </div>
        </section>
        <section className="bg-secondary-purple w-full flex">
          <div className="md:w-2/6 xl:w-1/2" />
          <div className="md:w-4/6 xl:w-1/2 px-10">
            <div className="flex md:pt-[30px] xl:pt-[53px] pb-[21px] items-center">
              <TextNumber number="02" />
              <h1 className="title pl-[10px]">{ATHLETS[1].TITLE}</h1>
            </div>
            <p className="detail md:pb-[30px] xl:pb-[56px] text-black">{ATHLETS[1].DETAIL}</p>
          </div>
        </section>
        <section className=" bg-primary-purple w-full flex">
          <div className="md:w-2/6 xl:w-1/2" />
          <div className="md:w-4/6 xl:w-1/2 px-10">
            <div className="flex md:pt-[30px] xl:pt-[80px] pb-[21px] items-center">
              <TextNumber number="03" lineColor="bg-white" />
              <h1 className="title pl-[10px]">{ATHLETS[2].TITLE}</h1>
            </div>
            <p className="detail md:pb-[58px] xl:pb-[98px] text-white">{ATHLETS[2].DETAIL}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Athlets;
