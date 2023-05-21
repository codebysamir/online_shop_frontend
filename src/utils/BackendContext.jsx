import React, { createContext, useEffect, useState } from 'react'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export const BackendContext = createContext({
    products: [],
    product: {},
    setProducts: () => {},
    getAllProductsRequest: () => {},
    getProductRequest: () => {},
})

export default function BackendProvider({children}) {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState(null)

    const getAllProductsRequest = async () => {
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

    const getProductRequest = async (id) => {
      try {
        const request = await fetch(LOCAL + `/api/products/find/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjRhYjBjYWZlZTE4Mjk1MGZiMjg2YyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODAxNzk2MTcsImV4cCI6MTY4MDQzODgxN30.gBm4xEF454pimr4rJwm8xk3rnQ3jjAJifeMQDbCTz2o'
          }
        })
        const response = await request.json()
        console.log(response)
        setProduct(response)
        return response
      } catch (err) {
        console.log('product request failed, error: ')
      }
    }

    useEffect(() => {
        getAllProductsRequest()
      }, [])

    const backendValue = {
        products,
        product,
        setProducts,
        getAllProductsRequest,
        getProductRequest,
    }

  return (
    <BackendContext.Provider value={backendValue}>
        {children}
    </BackendContext.Provider>
  )
}
