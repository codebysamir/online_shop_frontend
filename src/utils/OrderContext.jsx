import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { fetchWithMiddleware } from '../middleware/fetchWithMiddleware'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export const OrderContext = createContext({
  getOrderHistory: () => {},
  orderHistory: Array,
  setOrderHistory: () => {},
  createOrder: () => {},
  orderId: String,
  setOrderId: () => {}
})

export default function OrderProvider({children}) {
    const { accessToken, setAccessToken, user, setUser, setIsLoggedIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [orderHistory, setOrderHistory] = useState([])
    const navigate = useNavigate()
    const fetchInterceptor = useFetch()

    const createOrder = async (cartProducts, stripeData) => {
      const fixedAddress = Object.fromEntries(Object.entries(stripeData.customer_details.address)
      .filter(item => item[1] !== null))
      console.log(fixedAddress)
      try {
        const request = await fetchInterceptor(LOCAL + '/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer ' + accessToken
          },
          body: JSON.stringify({
            userId: user.userId,
            stripeId: stripeData.id,
            products: cartProducts.map(products => ({
                productId: products.id, 
                quantity: products.quantity,
                size: products.size,
                color: products.color,
              })
            ),
            amount: stripeData.amount_total / 100,
            address: fixedAddress
          })
        })
        const response = await request.json()
        console.log(response)
        setOrderId(response._id)
      } catch (err) {
        console.log('creating order error: ' + err)
      }
    }
    
    const getOrderHistory = async () => {
      try {
        const orderHistoryRequest = await fetchInterceptor(LOCAL + '/api/orders/find/' + user.userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer ' + accessToken
          }
        })
        const response = await orderHistoryRequest.json()
        console.log(response)
        setOrderHistory(response)
      } catch (error) {
        console.log(error)
        navigate('/login')
      }
    }

    const orderValue = {
      getOrderHistory,
      orderHistory,
      setOrderHistory,
      createOrder,
      orderId,
      setOrderId,
      loading,
      isSuccess,
      setIsSuccess,
      error,
      setError,
    }

  return (
    <OrderContext.Provider value={orderValue}>
        {children}
    </OrderContext.Provider>
  )
}
