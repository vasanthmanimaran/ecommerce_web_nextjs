"use client"

import React from 'react'
import Categories from './categories'
import Banner from './banner'
import Cards from './cards'

const Homemain = () => {
  return (
    <div className='bg-gray-200'>
      <Banner />
      <Cards />
      <Categories />
    </div>
  )
}

export default Homemain
