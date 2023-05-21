import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { OrderContext } from '../utils/OrderContext'
import { CartContext } from '../utils/CartContext'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export default function Success() {
  // const { cartProducts, stripeData } = useLocation().state
  const { createOrder, orderId } = useContext(OrderContext)
  const {products: cartProducts, setCardProducts } = useContext(CartContext)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("sessionId");
  
  useEffect(() => {
    const controller = new AbortController()

    console.log('useEffect FetchCheckoutSessionData')
    const fetchCheckoutSessionData = async () => {
      try {
        const getCheckoutData = await fetch(LOCAL + '/api/stripe/checkout-complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: sessionId}),
          signal: controller.signal
        })
        const response = await getCheckoutData.json()
        console.log(response)
        const stripeData = response.data
        response.status === 'success' && createOrder(cartProducts, stripeData)
        setCardProducts([])
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Abort Controller canceled')
        } else {
          console.log('creating order error: ' + err)
        }
      }
    }
    if (cartProducts?.length > 0 && sessionId) fetchCheckoutSessionData()

    return () => {
      controller.abort()
    }
  }, [cartProducts, sessionId])
  
  // useEffect(() => {
  //   console.log('useEffect' + cartProducts, stripeData)
  //   const controller = new AbortController()
  //   stripeData && createOrder(cartProducts, stripeData, controller)

  //   return () => {
  //     controller.abort()
  //   }
  // }, [cartProducts, stripeData])

  return (
    <div className="success-page-box">
      <div className='success-page'>
          <h1>Successfull</h1>
          {orderId ? 
          <span>Order has been created successfully. Your order number is "{orderId}"</span>
          :
          <span>Successfull. Your order is being prepared...</span>
          }
          <Link to={'/'}>
            <button className="backToHome">Go to Homepage</button>
          </Link>
      </div>
    </div>
  )
}
