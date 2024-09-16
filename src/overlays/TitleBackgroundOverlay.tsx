import React, { FC } from 'react';
import bgArt from '../assets/art/rto-bg-title-screen-1.webp';
import { Outlet } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
};
export const TitleBackgroundOverlay: FC<Props> = () => {
  return (
    <div className="relative w-screen h-screen">
      <img className="absolute top-0 left-0 w-full h-full" src={bgArt} />
      <div className="absolute top-0 left-0 z-10 bg-zinc-900 w-full h-full opacity-50" />

      <div className="z-20">
        <Outlet />
      </div>
    </div>
  );
};
