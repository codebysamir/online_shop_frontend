import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faHeart, faRectangleList } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft, faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { ModalContext } from '../utils/ModalContext'
import { AuthContext } from '../utils/AuthContext'
import ChangeUserDetails from './ChangeUserDetails'
import Modal from './Modal'
import { UserContext } from '../utils/UserContext'
import { OrderContext } from '../utils/OrderContext'
import { BackendContext } from '../utils/BackendContext'
import { Link } from 'react-router-dom'
import { FavoritesContext } from '../utils/FavoritesContext'

export default function UserSideMenu() {
    const { modal, setModal } = useContext(ModalContext)
    const { user } = useContext(AuthContext)
    const { deleteUser } = useContext(UserContext)
    const { products } = useContext(BackendContext)
    const { getOrderHistory, orderHistory, setOrderHistory } = useContext(OrderContext)
    const [detailToChange, setDetailToChange] = useState()
    const [userModal, setUserModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [showOrderHistoryModal, setShowOrderHistoryModal] = useState(false)
    const [showFavoritesModal, setShowFavoritesModal] = useState(false)
    const { favorites, setFavorites } = useContext(FavoritesContext)

    // const favorites = JSON.parse(localStorage.getItem('favorites'))

    function handleDetailToChange(e) {
      setUserModal(true)
      const detail = e.target.innerText.split(' ')[1].toLowerCase()
      setDetailToChange(detail)
    }

    function handleDeleteUser() {
      deleteUser()
      setModal(false)
    }

    function handleShowOrderHistory() {
      if (showFavoritesModal) setShowFavoritesModal(false)
      setShowOrderHistoryModal(true)
      getOrderHistory()
    }

    function handleShowFavorites() {
      if (showOrderHistoryModal) setShowOrderHistoryModal(false)
      setShowFavoritesModal(true)
      console.log(favorites)
    }

    function handleRemoveFavorite(productId) {
      setFavorites(favorites.filter(favorite => favorite._id !== productId))
    }

    console.log(orderHistory)

  return (
    <div className="overlay" onClick={() => setModal(false)}>
        <div className={`userSideMenu-box active`} onClick={(e) => e.stopPropagation()}>
          <div className="profileImg">
              <img src='https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg'></img>
              {user?.isAdmin && <span className='isAdmin'>Admin</span>}
          </div>
          <div className="user-details">
            <div className='user-details-row'>
              <span>User ID: </span>
              <span className='user-details-highlight'>{user?.userId}</span>
            </div>
            <div className='user-details-row'>
              <span>Username: </span>
              <span className='user-details-highlight'>{user?.username}</span>
            </div>
            <div className='user-details-row'>
              <span>E-Mail: </span>
              <span className='user-details-highlight'>{user?.email}</span>
            </div>
            <div className='user-details-row'>
              <span>Created At: </span>
              <span className='user-details-highlight'>{user?.createdAt}</span>
            </div>
          </div>
          <div className="user-options">
            <span onClick={handleShowOrderHistory}>
              <FontAwesomeIcon icon={faRectangleList} />
              MY ORDER HISTORY
            </span>
            <span onClick={handleShowFavorites}>
              <FontAwesomeIcon icon={faHeart} />
              MY FAVORITES
            </span>
          </div>
          <div className="change-user">
            <span onClick={(e) => handleDetailToChange(e)}>CHANGE USERNAME</span>
            <span onClick={(e) => handleDetailToChange(e)}>CHANGE EMAIL</span>
            <span onClick={(e) => handleDetailToChange(e)}>CHANGE PASSWORD</span>
          </div>
          <div className="delete-user" onClick={() => setDeleteModal(true)}>
            <FontAwesomeIcon icon={faTrashCan} />
            <span>DELETE USER</span>
          </div>
        </div>
        {userModal &&
        <ChangeUserDetails detailToChange={detailToChange} setUserModal={setUserModal} />}
        {deleteModal &&
        <Modal 
        acceptBtnText={'YES, DELETE NOW'} 
        acceptFunction={handleDeleteUser} 
        modalText={'Are you sure you want to DELETE your User?'} 
        cancelFunction={() => setDeleteModal(false)}
        />}
        {showOrderHistoryModal &&
          <div className="orderHistory" onClick={e => e.stopPropagation()}>
            <div className="back-icon">
              <FontAwesomeIcon icon={faChevronLeft} size='2x' onClick={() => setShowOrderHistoryModal(false)}/>
            </div>
            <div className="orders-box">
              {orderHistory.length > 0 ?
                orderHistory.map(order => {
                  return (
                  <div className="order-box" key={order._id}>
                    <div className="orderDetails">
                      <span className="orderId">Order ID: {order._id}</span>
                      <span className="status">Status: {order.status}</span>
                      <span className="createdAt">Created At: {order.createdAt}</span>
                      <span className="amount">Total Amount: {order.amount}</span>
                    </div>
                    <div className="orderProducts-box">
                      {order.products.map(product => {
                        const productDetails = products.filter(prod => prod._id === product.productId)[0]
                        return (
                        <div className="orderProduct" key={product._id}>
                          <div className="orderProduct-img">
                            <img src={productDetails.img} alt={productDetails.title} />
                          </div>
                          <div className="orderProduct-details">
                            <span className="orderProductId">Product ID: {product.productId}</span>
                            <span className="orderProductQuantity">Quantity: {product.quantity}</span>
                            <span className="orderProductPrice">Price: {productDetails.price}</span>
                          </div>
                        </div>)
                      })}
                    </div>
                  </div>
                  )
                }).reverse()
                :
                <div className="noOrders">You have currently no Favorites.</div>
              }
            </div>
          </div>
        }
        {showFavoritesModal &&
          <div className="favorites" onClick={e => e.stopPropagation()}>
            <div className="back-icon">
              <FontAwesomeIcon icon={faChevronLeft} size='2x' onClick={() => setShowFavoritesModal(false)}/>
            </div>
            <div className="favorites-box">
              {favorites.length > 0 ?
                favorites.map(favorite => {
                  return (
                    <div className="favorite-box" key={favorite._id}>
                      <div className="favProduct" key={favorite._id}>
                        <Link to={'/product/' + favorite._id} onClick={() => setModal(false)}>
                          <div className="favProduct-img">
                            <img src={favorite.img} alt={favorite.title} />
                          </div>
                        </Link>
                        <div className="favProduct-details">
                          <span className="favProductId">{favorite.title}</span>
                          <span className="favProductPrice">{favorite.price} CHF</span>
                          <FontAwesomeIcon icon={faHeartCircleXmark} className='removeFavIcon' onClick={() => handleRemoveFavorite(favorite._id)} />
                        </div>
                      </div>
                    </div>
                  )
                }).reverse()
                :
                <div className="noOrders">You have currently no Favorites saved.</div>
              }
            </div>
          </div>
        }
    </div>
  )
}
