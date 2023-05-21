import jwt_decode from "jwt-decode"
// import axios from 'axios'
import { useContext } from "react"
import { AuthContext } from "../utils/AuthContext"

const LOCAL = import.meta.env.VITE_LOCALHOST_URL

function isTokenExpired(token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
}

export const fetchWithMiddleware = async (url, options) => {
    let [ accessToken, setAccessToken ] = options.middleware
    const userId = url.split('/').at(-1)
    let fetchOptions = options
    console.log('refreshTokenMiddleware Access Token: ' + accessToken)
    if ((accessToken && isTokenExpired(accessToken)) || !accessToken) {
        // Perform a refresh token request to obtain a new access token
        try {
            const refreshTokenRequest = await fetch(LOCAL + '/api/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
                // credentials: 'include',
                // mode: 'cors',
                // cache: 'no-cache'
            })
            const response = await refreshTokenRequest.json()
            console.log(response)

            // AXIOS ALTERNATIVE TEST REQUEST
            // const requestRefreshToken = await axios.get(LOCAL + '/api/auth/refresh-token', {
            //     withCredentials: true
            // })
            // console.log(requestRefreshToken)

            if (!refreshTokenRequest.ok) {
                throw new Error('Refresh token request failed');
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
    
    // Set the Authorization header with the current access token and proceed
    // request.headers.set('Authorization', `Bearer ${accessToken}`);
    const originalRequest = await fetch(url, fetchOptions)
    return originalRequest
}
