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

    const getAllProductsRequest = async (controller, category) => {
      console.log(category)
        try {
            const request = await fetch(!category ? `${LOCAL}/api/products` : `${LOCAL}/api/products?category=${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
            })
            const response = await request.json()
            console.log(response)
            setProducts(response)
        } catch (err) {
            console.log('product request failed, error: ', err)
        }
    }

    const getProductRequest = async (id) => {
      try {
        const request = await fetch(LOCAL + `/api/products/find/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
      const controller = new AbortController()
      getAllProductsRequest(controller)

      return () => controller.abort()
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
