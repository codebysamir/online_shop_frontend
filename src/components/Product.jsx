import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassPlus, faCartShopping, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons'
import SingleProductPage from '../pages/SingleProductPage'
import { CartContext } from '../utils/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../utils/AuthContext'
import { FavoritesContext } from '../utils/FavoritesContext'

export default function Product({product}) {
  const cart = useContext(CartContext)
  const { favorites, setFavorites } = useContext(FavoritesContext)
  const [chooseSizeMenu, setChooseSizeMenu] = useState(false)
  const [size, setSize] = useState()
  const [color, setColor] = useState()
  const { isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)


  function handleOpenChooseSizeMenu() {
    setChooseSizeMenu(true)
  }

  function handleCloseChooseSizeMenu() {
    setChooseSizeMenu(false)
    setColor()
    setSize()
  }

  function handleAddToCartBtn() {
    cart.addOneToCart(product._id, 1, size, color)
    setChooseSizeMenu(false)
    setColor()
    setSize()
  }

  function handleAddToFavorite() {
    if (!isLoggedIn) navigate('/login')
    const duplicate = favorites.find(favorite => favorite?._id === product._id)
    if (duplicate) {
      setFavorites(favorites.filter(favorite => favorite._id !== product._id))
    } else {
      setFavorites([...favorites, product])
      setIsFavorite(true)
    }
  }

  useEffect(() => {
    const duplicate = favorites.find(favorite => favorite?._id === product._id)
    if (duplicate) return
    setIsFavorite(false)
  }, [favorites])

  return (
    <div className='product-box'>
        <img
            className='product-img'
            src={product.img}
        />
        <div className="product-info">
          <span className='price'>{product.price} CHF</span>
          <span className="name">{product.title}</span>
        </div>
        {!chooseSizeMenu ?
        (<div className="hoverOptions iconOptions">
            <FontAwesomeIcon icon={faCartShopping} onClick={handleOpenChooseSizeMenu} />
            <Link to={`/product/${product._id}`}>
              <FontAwesomeIcon icon={faMagnifyingGlassPlus} size='lg' />
            </Link>
            <FontAwesomeIcon icon={faHeart} onClick={handleAddToFavorite} color={isFavorite ? 'red' : undefined}/>
        </div>)
        :
        (<div className="chooseSize-box">
          <div className="topbar">
            <span className="topbarTitle">Choose Size</span>
            <FontAwesomeIcon icon={faXmark} onClick={handleCloseChooseSizeMenu} />
          </div>
          <div className="sizes">
            {product.size.map((choosenSize, index) => 
            <span key={index} className={choosenSize === size ? "sizeBtn active" : "sizeBtn"} onClick={() => setSize(choosenSize)} >
              {choosenSize}
            </span>)}
          </div>
          <span className="topbarTitle">Choose Color</span>
          <div className="colors">
            {Object.entries(product.color).map(([colorName, colorHex]) => 
            <span title={colorName} key={colorName} style={{color: colorHex, backgroundColor: colorHex}} className={color ? (Object.keys(color)[0] === colorName ? "color active" : "color") : "color"} onClick={() => setColor({ [colorName]: colorHex })} ></span>)}
          </div>
          <button disabled={(!color || !size)} className="addToCart" onClick={handleAddToCartBtn}>ADD TO CART</button>
        </div>)}
    </div>
  )
}
