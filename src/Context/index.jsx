/* eslint-disable react-hooks/exhaustive-deps */
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

    //Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null);
    
    //Get products
    const [filteredItems, setFilteredItems] = useState(null);
    
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.log('Error : ' + error));
    }, []);
    
    
    const filteredItemsBytitle = (items, searchByTitle) => {
        return items?.filter(items => items.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    }
    
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(items => items.category.name.toLowerCase().includes(searchByCategory.toLowerCase()));
    }
    
    const filterBy = (searchType, items, searchByTitle, searchByCategory ) => {
        if(searchType === 'BY_TITLE'){
            return filteredItemsBytitle(items, searchByTitle);
        } 
        if (searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory);
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory).filter(items => items.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }
        if(!searchType) {
            return items
        }
    }

    useEffect(() => {
        if (searchByCategory && searchByTitle) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory ));
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory));
        if (searchByCategory && !searchByTitle) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory ));
        if (!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory ));
    }, [items, searchByTitle, searchByCategory]);
    

    console.log('searchByTitle: ', searchByTitle);
    console.log('searchByCategory: ', searchByCategory);
    console.log('filteredItems: ', filteredItems);

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
            setSearchByTitle,
            filteredItems,
            filteredItemsBytitle,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}