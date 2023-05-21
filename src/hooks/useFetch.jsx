import React, { useContext } from 'react'
import jwt_decode from "jwt-decode"
import { AuthContext } from '../utils/AuthContext';

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

function isTokenExpired(token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
}

export default function useFetch() {
    const { user, accessToken, setAccessToken } = useContext(AuthContext)
    const userId = user?.userId
    
    const callFetcher = async (url, options) => {
        console.log(options)
        let accessTokenCopy = options?.logoutData ? options.logoutData.accessToken : accessToken
        let userIdCopy = options?.logoutData ? options.logoutData.userId : userId
        let fetchOptions = options
        console.log('userId: ' + userIdCopy)
        console.log('refreshTokenMiddleware Access Token: ' + accessTokenCopy)
        if ((accessTokenCopy && isTokenExpired(accessTokenCopy)) || !accessTokenCopy) {
            // Perform a refresh token request to obtain a new access token
            try {
                const refreshTokenRequest = await fetch(LOCAL + '/api/auth/refresh-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userIdCopy })
                })
                const response = await refreshTokenRequest.json()
                console.log(response)
    
                if (!refreshTokenRequest.ok) {
                    // throw new Error('Refresh token request failed');
                    return Promise.reject(response)
                }
        
                // Update the access token with the new one
                setAccessToken(response.accessToken)
                fetchOptions = {
                    ...options,
                    headers: {
                        ...options.headers,
                        token: `Bearer ${response.accessToken}`
                    }
                }
            } catch (error) {
                // Handle the refresh token failure
                console.error('Refresh Token Endpoint failed:', error);
                return Promise.reject(error);
            }
        }
        console.log(accessToken)
        
        // Set the Authorization header with the current access token and proceed
        const originalRequest = await fetch(url, fetchOptions)
        return originalRequest
    }

    return callFetcher
}
