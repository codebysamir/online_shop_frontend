import { useState } from 'react'
import CartProvider from './utils/CartContext'
import './css/App.css'
import Home from './pages/Home'
import SingleProductPage from './pages/SingleProductPage'
import CartPage from './pages/CartPage'
import ModalProvider from './utils/ModalContext'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import ProductListPage from './pages/ProductListPage'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import BackendProvider from './utils/BackendContext'
import Login from './pages/Login'
import UserProvider from './utils/UserContext'
import Register from './pages/Register'
import AuthProvider from './utils/AuthContext'
import OrderProvider from './utils/OrderContext'
import FavoritesProvider from './utils/FavoritesContext'

function App() {
  const [prevPage, setPrevPage] = useState('Home')

  return (
    <BrowserRouter>
      <BackendProvider>
        <CartProvider>
          <ModalProvider>
            <AuthProvider>
              <UserProvider>
                <OrderProvider>
                  <FavoritesProvider>
                    <Routes>
                      <Route index path='/' element={<Home />}></Route>
                      <Route path='/categories/:cat' element={<ProductListPage />}></Route>
                      <Route path='/product/:id' element={<SingleProductPage />}></Route>
                      <Route path='/cart' element={<CartPage />}></Route>
                      <Route path='/success' element={<Success />}></Route>
                      <Route path='/cancel' element={<Cancel />}></Route>
                      <Route path='/login' element={<Login />}></Route>
                      <Route path='/register' element={<Register />}></Route>
                    </Routes>
                  </FavoritesProvider>
                </OrderProvider>
              </UserProvider>
            </AuthProvider>
          </ModalProvider>
        </CartProvider>
      </BackendProvider>
    </BrowserRouter>
  )
}

export default App
