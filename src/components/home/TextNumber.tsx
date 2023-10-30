/* eslint-disable react/no-unused-prop-types */
import React from 'react';

interface Props {
  number: string;
  numberColor?: string;
  lineColor?: string;
}

const TextNumber: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col">
      <p className={`font-roboto text-[14px] md:text-[18px] tracking-[1.5px] line-height-normal font-normal ${props.numberColor ? props.numberColor : 'text-black'} `}>{props.number}</p>
      <div className={`h-[4px]  md:h-[5px] ${props.lineColor ? props.lineColor : 'bg-primary-purple'}  w-[19px] rounded-[2.5px] flex flex-shrink self-center `} />
    </div>
  );
};

export default TextNumber;
