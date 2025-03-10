"use client"
import Image from 'next/image';
import React from 'react';
import Banner from '../../../../assets/png/searchBanner.png';
import SearchBox from '@/components/SearchBox';

function SearchResults() {
  return (
    <div className='bg-ado-background w-full'>
      <div className="w-full h-[210px] relative">
        <Image
          src={Banner}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute bottom-4 rounded-lg w-full">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
