import Header from '@/components/root/Header/Header'
import TeamsSection from '@/components/root/TeamsSection/TeamSection'
import React, { JSX } from 'react'

export default function Teams():JSX.Element {
  return (
    <React.Fragment>
      <Header title="Our Team" />
      <TeamsSection/>
    </React.Fragment>
  )
}
