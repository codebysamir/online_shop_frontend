import React, { createContext, useState } from 'react'
import useLocalStorage from './useLocalStorage'

export const FavoritesContext = createContext({
    favorites: Array,
    setFavorites: () => {},
    isFavorite: Boolean,
    setIsFavorite: () => {}
})

export default function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useLocalStorage('favorites', [])
    const [isFavorite, setIsFavorite] = useState(false)

    const FavoritesValue = {
        favorites,
        setFavorites,
        isFavorite,
        setIsFavorite
    }

  return (
    <FavoritesContext.Provider value={FavoritesValue}>
        {children}
    </FavoritesContext.Provider>
  )
}

