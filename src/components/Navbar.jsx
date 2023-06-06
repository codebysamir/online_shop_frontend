import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import CartPage from '../pages/CartPage'
import Home from '../pages/Home'
import { BrowserRouter, Link } from 'react-router-dom'
import { CartContext } from '../utils/CartContext'
import { AuthContext } from '../utils/AuthContext'
import { ModalContext } from '../utils/ModalContext'
import UserSideMenu from './UserSideMenu'
import SearchResults from './SearchResults'
import { BackendContext } from '../utils/BackendContext'
import { FavoritesContext } from '../utils/FavoritesContext'

export default function Navbar() {
  const cart = useContext(CartContext)
  const {user, isLoggedIn, logoutUser } = useContext(AuthContext)
  const { products } = useContext(BackendContext)
  const { modal, setModal } = useContext(ModalContext)
  const { setFavorites } = useContext(FavoritesContext)
  const [showNavbar, setShowNavbar] = useState(false)
  const [searchModal, setSearchModal] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchResult, setSearchResult] = useState([])
  
  function handleLoggingOut() {
    logoutUser()
    setFavorites([])
  }

  let scrollPos = window.scrollY
  
  useEffect(() => {
    window.onscroll = (e) => {
      // console.log(window.scrollY)
      // console.log(scrollPos)
      if (window.scrollY !== 0 && window.scrollY > scrollPos) {
        setShowNavbar(true)
      } else  {
        setShowNavbar(false)
        // console.log('down')
      }
      scrollPos = window.scrollY
      if(searchModal) setSearchModal(false)
    }

    return () => {
      if (window.scrollY === 0 && !showNavbar) {
        setShowNavbar(false)
      }
    }
  }, [window.scrollY, showNavbar])

  useEffect(() => {
    if (modal) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }

    return () => {
      document.body.classList.remove('noScroll');
    };
  }, [modal])

  function handleSearch() {
    if (!searchInput.length) return
    setSearchResult(products?.filter(product => product.title.toLowerCase().includes(searchInput.toLocaleLowerCase()) && product))
    setSearchModal(true)
    setSearchInput('')
  }

    return (
    <div className={showNavbar ? 'navbar-box' : 'navbar-box onScroll'}>
      <div className='input-box'>
          <input className='input' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <FontAwesomeIcon icon={faMagnifyingGlass} id='navbarSearchIcon' onClick={handleSearch} />
      </div>
      <div className='pageTitle'>
        <Link to={'/'}>
          <h1>Online-Shop</h1>
        </Link>
      </div>
      
      <div className='signIn_signOut-box'>
          {isLoggedIn ?
            <>
              <img src={user.img} className='profile' onClick={() => setModal(true)} />
              {/* <FontAwesomeIcon icon={faCircleUser} className='profile' onClick={() => setModal(true)} /> */}
              <span className='signIn_signOut-text' onClick={handleLoggingOut} >Sign Out</span>
            </>
            :
            <>
              <Link to={'/register'}>
                <span className='signIn_signOut-text'>Register</span>
              </Link>
              <Link to={'/login'}>
                <span className='signIn_signOut-text'>Sign In</span>
              </Link>
            </>
          }
      </div>
      <div className="shoppingCart-box" data-cart={cart.products?.length ?? 0}>
        <Link to={'/cart'}>
          <div className='shoppingCart'>
            <FontAwesomeIcon icon={faCartShopping} size='lg' />
          </div>
        </Link>
      </div>
      {modal &&
        <UserSideMenu />
      }
      {searchModal &&
        <SearchResults searchResult={searchResult} setSearchModal={setSearchModal} />
      }
    </div>
  )
}
