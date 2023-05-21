import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../utils/CartContext'

export default function SingleProduct({product}) {
    const cart = useContext(CartContext)
    const [count, setCount] = useState(1) 
    const [size, setSize] = useState(product.size[0]) 
    const [color, setColor] = useState(Object.entries(product.color)[0]) 

    function handleAddToCart() {
        console.log(cart)
        cart.addOneToCart(product._id, count, size, color)
    }

    console.log(product)

  return (
    <div className='singleProduct-box'>
        <img className='img-box' src={product.img} />
        <div className="product-details">
            <h4 className="product-name">{product.title}</h4>
            <p className="product-text">
                {product.desc}
            </p>
            <span className="price">
                <span className="amount">{product.price}</span>
                <span className="currency">CHF</span>
            </span>
            <div className="productOptions">
                <span className="color-box">
                    <span>Color</span>
                    {Object.entries(product.color).map(([colorName, colorHex]) => {
                        return <div title={colorName} key={colorName} style={{color: colorHex, backgroundColor: colorHex}} className={color[0] === colorName ? "color active" : "color"} onClick={() => setColor([colorName, colorHex])}></div>
                    })}
                </span>
                <span className="size-box">
                    <span>Size</span>
                    <select name="size" id="" onChange={(e) => setSize(e.target.value)}>
                        {product.size.map((size, index) => <option key={index} value={size}>{size}</option>)}
                    </select>
                </span>
            </div>
            <div className="buyOptions">
                <div className="quantity">
                    {count > 1 ?
                     <FontAwesomeIcon icon={faMinus} onClick={() => setCount(() => count - 1)} />
                     : null
                    }
                    <span className="quantityAmount">
                        {count}
                    </span>
                    <FontAwesomeIcon icon={faPlus} onClick={() => setCount(() => count + 1)} />
                </div>
                <button className='addToCart' onClick={handleAddToCart}>ADD TO CART</button>
            </div>
        </div>
    </div>
  )
}
