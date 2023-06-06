import React, { useContext, useEffect, useState } from 'react'
import Product from './Product'
import { BackendContext } from '../utils/BackendContext'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL


export default function FilteredProductLists({cat, filters, sort}) {
  // const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState([])
  const { getAllProductsRequest, products, loading, error } = useContext(BackendContext)

  useEffect(() => {
    const controller = new AbortController()
    getAllProductsRequest(controller, cat)
    // setFilteredProduct(products)

    return () => controller.abort()
  }, [])

  useEffect(() => {

    setFilteredProduct(filtProducts => {
      if (sort === 'desc') {
        const priceList = [...filtProducts].sort((a, b) => a.price - b.price)
        return priceList
      } else if (sort === 'asc') {
        const priceList = [...filtProducts].sort((a, b) => b.price - a.price)
        return priceList
      } else if (sort === 'newest') {
        const newestList = [...filtProducts].sort((a, b) => a.id - b.id)
        return newestList
      }
    })
  }, [sort])

  useEffect(() => {
    console.log(filteredProduct)
    console.log(filters)
    
    if (filters) {
      setFilteredProduct(products.filter(product => Object.entries(filters).every(([key, value]) => {
        if (key === 'color' && value !== '') {
          return Object.keys(product[key]).includes(value)
        } else if (key === 'color' && value === '') {
          return Object.keys(product[key])
        }
        if (key === 'size' && value !== '') {
          return product[key].includes(value)
        } else if (key === 'size' && value === '') {
          return product[key]
        }
      }))
      )
    } else {
      setFilteredProduct(products)
    }
    
  }, [products, cat, filters])
  
  console.log(filteredProduct)
  return (
    <>
    {!filteredProduct.length ? 
    <div className='soldOut-box'>
      <span className='soldOut'>Sadly this category is sold out.</span>
    </div>
    :
    <div className='productList-box'>
      {loading ? <span>Loading...</span>
      :
      filteredProduct.map(product => <Product key={product._id} product={product} />
      )}
      {error && <span>Oops it seems like there is a problem, please reload the page or go back.<br/>{error?.message ?? error}</span>}
    </div>}
    </>
  )
}
