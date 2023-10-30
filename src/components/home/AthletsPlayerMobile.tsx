/* eslint-disable react/no-array-index-key */

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

import { ATHLETS, PLAYERS } from '@/constants/text';
import TextNumber from '@/components/home/TextNumber';
const AthletsPlayerMobile = () => {
  return (
    <div className="block md:hidden bg-white">
      <section>
        <div className="px-[18px] h-[310px]">
          <h1 className="header text-left pb-[11px]">ATHLETS</h1>
          <div className="flex justify-center relative">
            <img src="/images/graphic-mobile.png" className="top-0 absolute z-50" alt="player1" />
          </div>
        </div>
        <div className="px-[18px] h-[284px] bg-secondary-purple">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {ATHLETS.map((data, idx) => (
              <SwiperSlide>
                <div
                  key={idx}
                >
                  <div className="flex flex-col items-start w-full pt-[72px]">
                    <div className="flex items-center pb-[20px]">
                      <TextNumber number={`0${idx + 1}`} />
                      <p className="title pl-[10px]">{data.TITLE}</p>
                    </div>
                    <p className="detail">{data.DETAIL}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>

      <section>
        <div className="px-[18px] h-[284px]">
          <h1 className="header text-left pb-[11px]">PLAYERS</h1>
          <div className="flex justify-center relative">
            <img src="/images/graphic2-mobile.png" className="top-0 left-0 absolute z-50" alt="player1" />
          </div>
        </div>
        <div className="px-[18px] h-[284px] bg-secondary-purple">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {PLAYERS.map((data, idx) => (
              <SwiperSlide>
                <div
                  key={idx}
                >
                  <div className="flex flex-col items-start w-full pt-[72px]">
                    <div className="flex items-center pb-[20px]">
                      <TextNumber number={`0${idx + 1}`} />
                      <p className="title pl-[10px]">{data.TITLE}</p>
                    </div>
                    <p className="detail">{data.DETAIL}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default AthletsPlayerMobile;
