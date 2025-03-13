import { PageTypes } from '@/types/types';
import React from 'react';
import Link from 'next/link';

const Header:React.FC<PageTypes> = ({title=''}) => {
  return (
    <div className="page-header animate-fade-in animation-delay-100">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-slide-in-down">
          {title}
        </h1>
        <nav aria-label="breadcrumb" className="animate-slide-in-down">
          <ol className="flex justify-center space-x-2 mb-0">
            <li className="breadcrumb-item">
              <Link href="/" className="text-white hover:text-primary transition duration-300">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="#" className="text-white hover:text-primary transition duration-300">
                Pages
              </Link>
            </li>
            <li className="breadcrumb-item text-purple-600" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Header;