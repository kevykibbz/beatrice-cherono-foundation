import Header from '@/components/root/Header/Header';
import React, { JSX } from 'react';
import TestimonialsSection from '@/components/root/TestimonialsSection/TestimonialsSection';



export default function Page(): JSX.Element {
  

  return (
    <React.Fragment>
      <Header title="Testimonials" />
      <TestimonialsSection/>
    </React.Fragment>
  );
}
