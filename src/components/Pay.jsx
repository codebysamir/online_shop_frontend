import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import Success from '../pages/Success';
import { useEffect } from 'react';

export default function Pay({ totalCost }) {
    const [stripeToken, setStripeToken] = useState(null) 

    useEffect(() => {
        const stripeRequest = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/stripe/pay', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tokenId: stripeToken.id,
                        amount: totalCostWithDezimals()
                    })
                })
                const result = await response.json()
                console.log(result)
            } catch (err) {
                console.log(err)
            }
        }
        if (stripeToken) stripeRequest()
    }, [stripeToken])


    const KEY ='pk_test_51MqJN8IiXk2YDXwdNNFxsCvvtTuYxPzzWZAAUX5w8uHFqvHajlcr5oUwrOAXBgYgxWjDsxE0VJAjsXO6nEemwtES00EnsN6s35'

    const onToken = (token) => {
        setStripeToken(token)
    }

    const totalCostWithDezimals = () => {
        const newTotal = totalCost * 100
        console.log(newTotal)
        return newTotal
    }

  return (
    <div className='pay-box'>
        {stripeToken ?
            (<Success />)
            :
            (<StripeCheckout 
                name='Online Shop' 
                image='https://image.similarpng.com/very-thumbnail/2020/11/Online-Shop-logo-isolated-on-transparent-PNG.png'
                billingAddress
                shippingAddress
                description={`Your Total is ${totalCost}`}
                amount={totalCostWithDezimals()}
                token={onToken} 
                stripeKey={process.env.STRIPE_PUBLIC_KEY}
            />)
        }
    </div>
  )
}
