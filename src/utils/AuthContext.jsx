import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage'
import { CartContext } from './CartContext'
import useFetch from '../hooks/useFetch'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export const AuthContext = createContext({
  loginUser: () => {},
  registerUser: () => {},
  loginError: String,
  isLoggedIn: Boolean,
  setIsLoggedIn: () => {},
  user: Object,
  setUser: () => {},
  accessToken: String,
  setAccessToken: () => {},
  isSuccess: Boolean,
  logoutUser: () => {}
})

export default function AuthProvider({children}) {
  const [accessToken, setAccessToken] = useState(null)
  const [loginError, setLoginError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)
  const [user, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()
  const location = useLocation()
  const fetchInceptor = useFetch()
  const { setCardProducts } = useContext(CartContext)

    const loginUser = async (user) => {
      try {
        const loginRequest = await fetch(LOCAL + '/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        const response = await loginRequest.json()
        console.log(response)
        if (response.status === 'failed') {
          setLoginError(response?.msg)
        } else {
          setAccessToken(response?.accessToken)
          setLoginError(null)
          setIsLoggedIn(true)
          setUser({
            userId: response._id,
            email: response.email,
            username: response.username,
            createdAt: response.createdAt,
            isAdmin: response.isAdmin
          })
          console.log(location)
          navigate(-1)
        }
      } catch (err) {
        console.log('ERROR User Login failed: ', err)
      }
    }

    const registerUser = async (user) => {
      try {
        const registerRequest = await fetch(LOCAL + '/api/auth/register' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        const response = await registerRequest.json()
        console.log(response)
        
        if (response.status === 'failed') {
          setLoginError(response?.user)
          console.log('register failed: ' + response.status)
        } else if (response.status === 'error') {
          setLoginError(response?.err.message)
          console.log('register error: ' + response.status)
        } else {
          setLoginError(null)
          // setUser({
          //   userId: response.user._id,
          //   email: response.user.email,
          //   username: response.user.username,
          //   createdAt: response.user.createdAt,
          //   isAdmin: response.user.isAdmin
          // })
          setIsSuccess(true)
        }
      } catch (err) {
        console.log('ERROR Register New User failed: ', err)
      }
    }

    useEffect(() => {
      isSuccess && setTimeout(() => {
        setIsSuccess(false)
        navigate(-1)
      }, 2000);
    }, [isSuccess])
    

    const logoutUser = async () => {
      try {
        const requestLogout = await fetchInceptor(LOCAL + '/api/auth/logout/' + user.userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: 'Bearer ' + accessToken
          },
          logoutData: {
            userId: user.userId,
            accessToken
          }
        })
        const response = await requestLogout.json()
        console.log(response)
        if (!requestLogout.ok) return new Error(response)
        setIsLoggedIn(false)
        setUser(null)
        setCardProducts([])
        // setIsSuccess(true)
        setAccessToken(null)
      } catch (err) {
        console.log('ERROR Logout User failed: ', err)
        if (err.status === 'expired') navigate('/login')
      }
    }

    const authValue = {
        loginUser,
        registerUser,
        loginError,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        accessToken,
        setAccessToken,
        isSuccess,
        logoutUser
    }

  return (
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
  )
}
