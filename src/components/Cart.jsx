import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../utils/CartContext'
import CartSingleProduct from './CartSingleProduct'
import StripeCheckout from 'react-stripe-checkout'
import { redirect, useNavigate } from 'react-router-dom'
import { BackendContext } from '../utils/BackendContext'
import { AuthContext } from '../utils/AuthContext'
import { ModalContext } from '../utils/ModalContext'
import Modal from './Modal'
import useFetch from '../hooks/useFetch'

const KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY
const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export default function Cart() {
  const [stripeToken, setStripeToken] = useState(null) 
  const { isLoggedIn, accessToken } = useContext(AuthContext)
  const [modal, setModal] = useState(false)
  const cart = useContext(CartContext)
  const { products: productsFromDB } = useContext(BackendContext)  
  const navigate = useNavigate()
  const fetchInterceptor = useFetch()

  
  const stripeRequest = async () => {
    const itemsToBuy = cart.products.map(product => {
      const productInfo = productsFromDB.find(item => item._id === product.id)
      const detailedProduct = {
        ...product,
        price: productInfo.price * 100,
        name: productInfo.title,
        img: productInfo.img
      }
      return detailedProduct
    })
    console.log(itemsToBuy)

    try {
      const response = await fetchInterceptor(LOCAL + '/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: 'Bearer ' + accessToken
        },
        body: JSON.stringify({items: itemsToBuy})
      })
      const result = await response.json()
      console.log(result)
      if (result.status) {
        console.log(cart.products)
        window.location = result.url
        // navigate('/success', {state: {cartProducts: cart.products, stripeData: result} })
      }
      if (result.statusCode) navigate('/cancel')
    } catch (err) {
      console.log(err)
      if (err?.status === 'expired') navigate('/login')
    }
  }
    
  const handleStripeRequest = () => {
    if (cart.getTotalCost() > 0) stripeRequest()
  }


  // useEffect(() => {
  //   const stripeRequest = async () => {
  //     try {
  //         const response = await fetch(LOCAL + '/api/stripe/checkout', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({
  //                 tokenId: stripeToken.id,
  //                 amount: cart.getTotalCost() * 100
  //             })
  //         })
  //         const result = await response.json()
  //         console.log(result)
  //         if (result.status) {
  //           navigate('/success', {state: {cartProducts: cart.products, stripeData: result} })
  //           cart.setCardProducts([])
  //         }
  //         if (result.statusCode) navigate('/cancel')
  //       } catch (err) {
  //         console.log(err)
  //       }
  //   }
  //   console.log(cart.getTotalCost())
  //   if (stripeToken && cart.getTotalCost() > 0) stripeRequest()
  // }, [stripeToken])


  // const onToken = (token) => {
  //     setStripeToken(token)
  // }

  return (
    <div className='cart-box'>
      <h1 className="title">MY CART</h1>
      <div className="cart-details">
        <div className="productsInCart">
          {cart.products.length > 0 ?
          cart.products.map(products => {
            console.log(products.quantity)
            // const productData = getProductData(products.id)
            const product = productsFromDB.find(prod => prod._id === products.id)
            console.log(product)
            return <CartSingleProduct key={products.id + products.size + products.color} product={product} quantity={products.quantity} size={products.size} color={products.color} />
          })
          :
          <div className="emptyCart">Cart is Empty</div>
          }
        </div>
        <div className="checkout">
          <div className="productToBuy-box">
            {cart.products.map(products => {
              console.log(products)
              // const productData = getProductData(products.id)
              const product = productsFromDB.find(prod => prod._id === products.id)
              console.log(product)
              return (
                <div className='productToBuy' key={products.id + products.size + products.color[0]}>
                  <span className="name">{product?.title}</span>
                  <span className="price">{product?.price * products.quantity} CHF</span>
                </div>
              )
            })}
          </div>
          <div className="productsTotal">
            <span>Subtotal</span>
            <span className="total">{cart.getTotalCost()} CHF</span>
          </div>
          {!isLoggedIn ? 
          (<div className="checkout-btn-box">
          <button className="checkout-btn" onClick={() => setModal(true)} >Log In for Checkout</button>
          </div>)
          :
          (cart.getTotalCost() === 0 ?
          (<div className="checkout-btn-box">
            <button className="checkout-btn" onClick={() => alert('Cart is Empty!')} >Cart is Empty</button>
          </div>)
          :
          (<div className="checkout-btn-box">
          <button className="checkout-btn" onClick={handleStripeRequest}>
            Checkout
          </button>
        </div>))
          // (<StripeCheckout 
          //       name='Online Shop' 
          //       image='https://image.similarpng.com/very-thumbnail/2020/11/Online-Shop-logo-isolated-on-transparent-PNG.png'
          //       billingAddress
          //       shippingAddress
          //       description={`Your Total is ${cart.getTotalCost()} CHF`}
          //       amount={cart.getTotalCost() * 100}
          //       token={onToken} 
          //       stripeKey={KEY}
          //   >
          //   <div className="checkout-btn-box">
          //     <button className="checkout-btn">
          //       Checkout
          //     </button>
          //   </div>
          // </StripeCheckout>))
          }
        </div>
      </div>
      {modal && <Modal acceptBGColor={'accept-black'} acceptBtnText={'Log In'} acceptFunction={() => navigate('/login')}
      modalText={'You need to create an Account or Sign In to checkout.'} />}
    </div>
  )
}
