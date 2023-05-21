import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SingleProduct from '../components/SingleProduct'
import Footer from '../components/Footer'
import { useLocation, useParams } from 'react-router-dom'
import { BackendContext } from '../utils/BackendContext'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export default function SingleProductPage() {
  const { getProductRequest, product } = useContext(BackendContext)
  // const [product, setProduct] = useState(null)

  const { id } = useParams()
  console.log(id)
  // const product = getProductData(parseInt(id))
  
  useEffect(() => {
    console.log('test')
    getProductRequest(id)
  }, [id])

  console.log(product)
  return (
    <>
      <Navbar />
      {/* <PagePath currentPage={product.title} /> */}
      {product && <SingleProduct key={product._id} product={product} />}
      <Footer />
    </>
  )
}
