import React, { useState, useRef} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Cart from './components/Cart';
import Catalog from './components/Catalog';
import Header from './components/Header';
import Product from './components/Product';

const AppContext = React.createContext()


function App() {
	
	const [products, setProducts] = useState([])
	const [cartProducts, setCartProducts] = useState([])
	const sliderUl = useRef()

	function getData() {
        
        if(products.length !== 0) return

        let localData = localStorage.getItem('localData')
        if(localData) localData = JSON.parse(localData)
        
        if(localData && localData.length > 0) {
            setProducts([...localData])
            return
        }

        fetch('https://fakestoreapi.com/products/')
        .then((response) => {
            return response.json()
        })
        .then(result => {
            setProducts([...result])
            localStorage.setItem('localData', JSON.stringify(result))
        })
    }

    function getCart() {
        if(cartProducts.length !== 0) return

        let localCart = localStorage.getItem('localCart')
        if (localCart) localCart = JSON.parse(localCart)
        if(localCart && localCart.length > 0) {
            setCartProducts([...localCart])
            return
        }
    }

	function addToCart(id) {
        let cartTmp = cartProducts

        if(cartTmp.indexOf(id) !== -1) {
            cartTmp = cartTmp.filter(item => item !== id)
        } else {
            cartTmp.push(id)
        }

        setCartProducts([...cartTmp])
        localStorage.setItem("localCart", JSON.stringify(cartTmp));
    }

    getData()
    getCart()
   
	return (
		<div className="app">
		<AppContext.Provider value={{products, setProducts, sliderUl, cartProducts, setCartProducts, addToCart}}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Catalog />}/>
					<Route path="/cart" element={<Cart />} />
					<Route path="/product/:id/" element={<Product />} />
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
		
		</div>
  	);
}

export {AppContext}
export default App;
