import React from 'react'
import { Link } from 'react-router-dom'

export default function Cancel() {
  return (
    <div className="cancel-page-box">
      <div className='cancel-page'>
          <h1>Cancel</h1>
          <p>Something went wrong, please try again.</p>
          <div className='cancelBtns'>
            <Link to={'/'}>
              <button className="backToHome">Go to Homepage</button>
            </Link>
            <Link to={'/cart'}>
              <button className="backToHome">Back to Cart</button>
            </Link>
            <Link to={-1}>
              <button className="backToHome">Back to Checkout</button>
            </Link>
          </div>
      </div>
    </div>
  )
}
