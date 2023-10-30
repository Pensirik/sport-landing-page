import React from 'react';
import TextNumber from './TextNumber';
import { PLAYERS } from '@/constants/text';

const Player = () => {
  return (
    <div>
      <div className="w-full relative hidden md:block">
        <div>
          <img src="/images/graphic2-desktop.png" className="hidden xl:block top-0 right-0 2xl:right-[125px] absolute h-[815px] 2xl:h-[840px] z-50" alt="player1" />
          <img src="/images/graphic2-tablet.png" className="hidden xl:hidden md:block md:top-[33px] top-0 right-0  absolute  z-50" alt="player1" />
        </div>
        <div className="flex flex-col w-full h-full">
          <section className="w-full flex bg-white">
            <div className="md:w-4/6 xl:w-1/2 md:pl-[30px] xl:px-10 2xl:pl-[322px]">
              <h1 className="header md:mt-[52px] xl:mt-[124px] line-height-normal">PLAYERS</h1>
            </div>
            <div className="md:w-2/6 xl:w-1/2" />
          </section>
          <section className="w-full flex">
            <div className="md:w-4/6 xl:w-1/2 md:pl-[30px]  xl:px-10 2xl:pl-[322px]">
              <div className="flex md:pt-[34px] xl:pt-[68px] pb-[21px] items-center">
                <TextNumber number="01" />
                <h1 className="title pl-[10px]">{PLAYERS[0].TITLE}</h1>
              </div>
              <p className="detail md:pb-[10px] xl:pb-[69px] text-black md:min-w-[432px] lg:w-full">{PLAYERS[0].DETAIL}</p>
            </div>
            <div className="md:w-fit  xl:w-1/2" />
          </section>
          <section className="bg-secondary-purple w-full flex">
            <div className="md:w-4/6 xl:w-1/2 md:pl-[30px]  xl:px-10 2xl:pl-[322px]">
              <div className="flex md:pt-[51px] xl:pt-[52px] pb-[21px] items-center">
                <TextNumber number="02" />
                <h1 className="title pl-[10px]">{PLAYERS[1].TITLE}</h1>
              </div>
              <p className="detail md:pb-[65px] xl:pb-[102px] text-black md:min-w-[432px] lg:w-full">{PLAYERS[1].DETAIL}</p>
            </div>
            <div className=" xl:w-2/6" />
          </section>
          <section className=" bg-ternary-purple w-full flex">
            <div className="md:w-4/6 xl:w-1/2 md:pl-[30px] xl:px-10 2xl:pl-[322px]">
              <div className="flex md:pt-[44px] xl:pt-[87px] pb-[21px] items-center">
                <TextNumber number="03" numberColor="text-primary-purple" lineColor="bg-white" />
                <h1 className="title pl-[10px]">{PLAYERS[2].TITLE}</h1>
              </div>
              <p className="detail md:pb-[72px] xl:pb-[62px] text-white">{PLAYERS[2].DETAIL}</p>
            </div>
            <div className="md:w-2/6 xl:w-1/2" />
          </section>

        </div>
      </div>
    </div>
  );
};

export default Player;
