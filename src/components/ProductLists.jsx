import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import { BackendContext } from '../utils/BackendContext'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export default function ProductLists() {
  // const [products, setProducts] = useState([])
  const { getAllProductsRequest, products } = useContext(BackendContext)

  return (
    <div className='productList-box'>
      {products.map(product => <Product key={product._id} product={product} />)}
    </div>
  )
}
