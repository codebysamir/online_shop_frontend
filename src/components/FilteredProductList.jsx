import React, { useEffect, useState } from 'react'
import Product from './Product'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL


export default function FilteredProductLists({cat, filters, sort}) {
  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState(products)

  useEffect(() => {
    const productRequest = async () => {
      try {
        const request = await fetch(LOCAL + '/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjRhYjBjYWZlZTE4Mjk1MGZiMjg2YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODAxNzk2MTcsImV4cCI6MTY4MDQzODgxN30.gBm4xEF454pimr4rJwm8xk3rnQ3jjAJifeMQDbCTz2o'
          }
        })
        const response = await request.json()
        console.log(response)
        setProducts(response)
      } catch (err) {
        console.log('product request failed, error: ')
      }
    }
    productRequest()
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
    setFilteredProduct(products.filter(product => Object.entries(filters).every(([key, value]) => {
        if (key === 'color') return Object.keys(product[key]).includes(value)
        if (key === 'size') return product[key].includes(value)
      }))
    )
  }, [products, cat, filters])

  return (
    <div className='productList-box'>
      {filteredProduct.map(product => <Product key={product._id} product={product} />)}
    </div>
  )
}
