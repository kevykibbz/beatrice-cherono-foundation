import React from 'react'
import LoadingSvg from "@/public/loader/loader.svg"
import { LoaderTypes } from '@/types/types';

export const Loading = ({width=100,height=100,fullScreen=true}:LoaderTypes) => {
  return (
    <div className={`${fullScreen ? 'h-screen' : ''} flex items-center justify-center`}>
      <LoadingSvg style={{ width: `${width}px`, height: `${height}px` }} />
    </div>
  );
}
