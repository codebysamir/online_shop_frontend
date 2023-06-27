import { createContext, useContext, useEffect, useState } from "react";
import { BackendContext } from "./BackendContext";
import useLocalStorage from "./useLocalStorage";

export const CartContext = createContext({
    products: [],
    setCardProducts: () => {},
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
})

export function CartProvider({children}) {
    const [cartProducts, setCardProducts] = useLocalStorage('cart', [])
    const { getAllProductsRequest, products } = useContext(BackendContext)

    function getProductQuantity(id, size, color) {
        const quantity = cartProducts.find(product => product.id === id && product.size === size && product.color[0] === color[0])?.quantity
        return quantity
    }

    function addOneToCart(id, amount, size, color) {
        const quantity = getProductQuantity(id, size, color)
        if (!quantity) {
            setCardProducts([...cartProducts, {id, quantity: amount, size, color}])
        } else {
            setCardProducts(
                cartProducts.map(product => product.id === id && product.size === size && Object.keys(product.color)[0] === Object.keys(color)[0] ? 
                    {...product, quantity: quantity + 1}
                    : product)
            )
        }
    }

    function removeOneFromCart(id, size, color) {
        const quantity = getProductQuantity(id, size, color)
        console.log(quantity)
        setCardProducts(
            cartProducts.map(product => product.id === id && product.size === size && product.color[0] === color[0] ? 
                {...product, quantity: quantity - 1}
                : product)
        )
    }

    function deleteFromCart(id, size, color) {
        const newList = cartProducts.filter(product => product.id !== id || (product.id === id && (product.size !== size || product.color[0] !== color[0])))
        console.log(newList)
        setCardProducts(newList)
    }

    function getTotalCost() {
        let total = 0
        cartProducts.forEach(product => {
            const quantity = getProductQuantity(product.id, product.size, product.color)
            // const { price } = getProductData(product.id)
            const productFromDB = products?.find(prod => prod._id === product.id)
            const price = productFromDB?.price
            const productTotal = price * quantity
            console.log(productTotal)
            total += productTotal
        })
        console.log(total)
        return total
    }

    const contextValue = {
        products: cartProducts,
        setCardProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider