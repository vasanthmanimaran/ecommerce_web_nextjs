"use client"

import React from 'react'
import Categories from './categories'
import Cards from './cards'
import Banner from './banner'

const Homemain = () => {
  return (
    <div className='bg-white'>
      <Banner />
        <Cards />
      <Categories />
      
    </div>
  )
}

export default Homemain
