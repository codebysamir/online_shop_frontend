import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import ProductCategories from '../components/ProductCategories'
import ProductLists from '../components/ProductLists'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
        <Navbar></Navbar>
        <Slider></Slider>
        <ProductCategories />
        <ProductLists></ProductLists>
        <Footer></Footer>
    </>
  )
}
