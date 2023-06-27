import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faHeartCirclePlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { CartContext } from '../utils/CartContext'
import { ModalContext } from '../utils/ModalContext'
import Modal from './Modal'
import { FavoritesContext } from '../utils/FavoritesContext'
import { AuthContext } from '../utils/AuthContext'

export default function CartSingleProduct({product, quantity, size, color}) {
    const [quantityIsOne, setQuantityIsOne] = useState(false) 
    const [count, setCount] = useState(quantity) 
    const cart = useContext(CartContext)
    const [modal, setModal] = useState(false)
    const { isLoggedIn } = useContext(AuthContext)
    const { favorites, setFavorites } = useContext(FavoritesContext)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
      if (count === 1) {
        setQuantityIsOne(true)
      } else {
        setQuantityIsOne(false)
      }
    
    }, [count])

    useEffect(() => {
      const duplicate = favorites.find(favorite => favorite?._id === product?._id)
      if (duplicate) return
      setIsFavorite(false)
    }, [favorites])

    function handleRemoveFromCart() {
      setCount(count => count - 1)
      cart.removeOneFromCart(product?._id, size, color)
    }

    function handleAddFromCart() {
      setCount(count => count + 1)
      cart.addOneToCart(product?._id, count + 1, size, color)
    }

    function handleDeleteFromCart() {
      cart.deleteFromCart(product?._id, size, color)
      setModal(false)
    }

    function handleAddToFavorite() {
      if (!isLoggedIn) navigate('/login')
      const duplicate = favorites.find(favorite => favorite?._id === product?._id)
      if (duplicate) {
        setFavorites(favorites.filter(favorite => favorite._id !== product?._id))
      } else {
        setFavorites([...favorites, product])
        setIsFavorite(true)
      }
    }

  return (
    <>
    <div className="product">
        <div className="image-box">
            <img src={product?.img} alt="" />
        </div>
        <div className="details">
            <div className="topbar">
                <span className="name">{product?.title}</span>
                <FontAwesomeIcon className='favIcon' icon={!isFavorite ? faHeartCirclePlus : faHeart} onClick={handleAddToFavorite} color={isFavorite ? 'red' : ''}/>
            </div>
            <span className="price">{product?.price * quantity}</span>
            <span className="description">{product?.desc}</span>
            <div className="additionalInfo">
              <span className="size">{size}</span>
              <span className="color" title={Object.keys(color)[0]} style={{color: Object.values(color)[0], backgroundColor: Object.values(color)[0]}}></span>
            </div>
            <div className="quantity">
                {quantityIsOne ?
                    (<FontAwesomeIcon className='trashIcon' icon={faTrashCan} onClick={() => setModal(true)} />)
                    : (<FontAwesomeIcon icon={faMinus} onClick={handleRemoveFromCart} />)
                }
                <span className="quanitityAmount">{count}</span>
                <FontAwesomeIcon icon={faPlus} onClick={handleAddFromCart} />
            </div>
        </div>
      {modal && 
      <Modal 
        acceptBGColor={'accept-red'}
        modalText={'Are you sure you want to remove this item from the Cart?'}
        acceptBtnText={'Remove Item'}
        acceptFunction={handleDeleteFromCart}
        cancelFunction={() => setModal(false)}
      />}
    </div>
    </>
  )
}
