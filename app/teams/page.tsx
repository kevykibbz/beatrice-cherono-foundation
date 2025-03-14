import Header from '@/components/Header/Header'
import Teams from '@/components/Teams/Team'
import React, { JSX } from 'react'

export default function TeamsSection():JSX.Element {
  return (
    <React.Fragment>
      <Header title="Our Teams" />
      <Teams/>
    </React.Fragment>
  )
}
