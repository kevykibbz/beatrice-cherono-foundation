"use client"
import Header from '@/components/Header/Header';
import { TestimonialsTypes } from '@/types/types';
import React, { JSX, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials: TestimonialsTypes[] = [
  {
    name: 'Doner Name',
    profession: 'Profession',
    image: '/images/testimonial-1.jpg',
    text: 'Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.',
  },
  {
    name: 'Doner Name',
    profession: 'Profession',
    image: '/images/testimonial-2.jpg',
    text: 'Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.',
  },
  {
    name: 'Doner Name',
    profession: 'Profession',
    image: '/images/testimonial-3.jpg',
    text: 'Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.',
  },
];


interface ArrowProps{
    onClick?:()=>void
}

function NextArrow(props:ArrowProps) {
  const { onClick } = props;
  return (
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer" onClick={onClick}>
      <ChevronRightIcon className="h-6 w-6 text-purple-500" />
    </div>
  );
}

function PrevArrow(props:ArrowProps) {
  const { onClick } = props;
  return (
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg cursor-pointer" onClick={onClick}>
      <ChevronLeftIcon className="h-6 w-6 text-purple-500" />
    </div>
  );
}

export default function Page(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '50px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex: number, newIndex: number) => setActiveIndex(newIndex),
  };

  return (
    <React.Fragment>
      <Header title="Testimonials" />
      <div className="py-16 min-h-screen bg-white text-center relative">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-gray-200 text-purple-600 py-2 px-3 rounded-full mb-3">Testimonials</div>
          <h1 className="text-3xl font-bold mb-6">Trusted By Thousands Of People And Nonprofits</h1>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`text-center p-6 transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-50'}`}> 
                <div className="w-24 h-24 mx-auto mb-4 border-4 border-purple-500 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div className={`p-6 rounded-lg transition-all duration-300 ${index === activeIndex ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                  <p className="mb-4">{testimonial.text}</p>
                  <h5 className="font-bold">{testimonial.name}</h5>
                  <span className="italic">{testimonial.profession}</span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
}
