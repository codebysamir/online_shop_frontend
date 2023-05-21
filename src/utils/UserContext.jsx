import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

export const UserContext = createContext({
    updateUser: () => {},
    loading: Boolean,
    isSuccess: Boolean,
    setIsSuccess: () => {},
    error: Boolean,
    setError: () => {},
    deleteUser: () => {}
})

export default function UserProvider({children}) {
    const { accessToken, user, setUser, setIsLoggedIn } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState()
    const apiFetch = useFetch()
    const navigate = useNavigate()
    
    const updateUser = async (newUserDetail) => {
        console.log(isSuccess)
        setLoading(true)
        setError()
        try {
            const updateUserRequest = await apiFetch(LOCAL + '/api/users/' + user.userId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken
                },
                body: JSON.stringify(newUserDetail)
            })
            const response = await updateUserRequest.json()
            console.log(response)
            console.log(updateUserRequest.ok)
            setLoading(false)
            if (!updateUserRequest.ok) { 
                if (response?.isDuplicate) return setError(response.message)
                return setError(response.message ?? response?.codeName)
                // return new Error(response)
            }
            if (response.isError) return setError(response.message)
            if (Object.keys(newUserDetail)[0] !== 'password') setUser({...user, ...newUserDetail})
            setIsSuccess(true)
        } catch (err) {
            console.log(err)
            setLoading(false)
            if (err?.status !== 'expired') setError(err.message ?? err)
            if (err?.status === 'expired') navigate('/login')
        }
    } 

    const deleteUser = async () => {
        setLoading(true)
        setError()
        try {
            const updateUserRequest = await apiFetch(LOCAL + '/api/users/' + user.userId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'Bearer ' + accessToken
                }
            })
            const response = await updateUserRequest.json()
            console.log(response)
            setLoading(false)
            if (!updateUserRequest.ok) { 
                setError(response.message ?? response)
                return new Error(response)
            }
            setUser(null)
            setIsLoggedIn(false)
            setIsSuccess(true)
        } catch (err) {
            console.log(err)
            setLoading(false)
            if (err?.status !== 'expired') setError(err.message ?? err)
            if (err?.status === 'expired') navigate('/login')
        }
    } 

    const userValue = {
        updateUser,
        loading,
        isSuccess,
        setIsSuccess,
        error,
        setError,
        deleteUser
    }

  return (
    <UserContext.Provider value={userValue}>
        {children}
    </UserContext.Provider>
  )
}
