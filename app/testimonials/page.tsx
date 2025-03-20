import Header from '@/components/Header/Header';
import React, { JSX } from 'react';
import TestimonialsSection from '@/components/TestimonialsSection/TestimonialsSection';



export default function Page(): JSX.Element {
  

  return (
    <React.Fragment>
      <Header title="Testimonials" />
      <TestimonialsSection/>
    </React.Fragment>
  );
}
