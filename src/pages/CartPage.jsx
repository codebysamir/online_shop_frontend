import React from 'react'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PagePath from '../components/PagePath'

export default function CartPage() {
  return (
    <>
      <Navbar />
      {/* <PagePath currentPage={'Shopping Cart'} /> */}
      <Cart />
      <Footer />
    </>
  )
}
