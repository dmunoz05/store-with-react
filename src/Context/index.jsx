/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {

    //Shopping Cart - Increment quantity
    const [count, setCount] = useState(0);

    //Open Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const openProductDetail = () => setIsProductDetailOpen(!isProductDetailOpen)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    //Checkout Side Menu - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(!isProductDetailOpen)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    //Get products
    const [items, setItems] = useState(null);

    //Product Detail - Show product
    const [productToShow, setproductToShow] = useState({});

    //Shopping Cart - Add products to cart
    const [cartProducts, setCartProducts] = useState([]);

    //Shopping Cart - Order
    const [order, setOrder] = useState([]);

    //Get products by title in search
    const [searchByTitle, setSearchByTitle] = useState(null);
    console.log(searchByTitle);


    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.log('Error : ' + error));
    }, []);


    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setproductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}