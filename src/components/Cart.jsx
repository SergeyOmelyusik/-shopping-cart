import React, {useContext, useEffect, useState} from "react"
import { NavLink } from "react-router-dom"
import { AppContext } from "../App"
import iconCart from '../images/cart.png'

const Cart = () => {
    const {cartProducts, setCartProducts, products} = useContext(AppContext)
    const [cart, setCart] = useState([])
    
    function setQuantity(event, index, id) {
        const item = event.target.closest('.cart__page_item')
        const input = item.querySelector('input')
        const dir = event.target.classList.contains('btn__plus')
        const data = cart
        let value = +input.value
        value = value + ((dir) ? 1 : (-1))
        if( value > 10 || value < 1) return
       
        input.value = value
       
        if(!value || value  <= 0 || !data[index]) return

        data[index].quantity = value

        setCart([...data])
    }

    function removeProduct(index, id) {
        const cartProductsTmp = cartProducts.filter(item => item !== id)
        setCartProducts([...cartProductsTmp])
        localStorage.setItem("localCart", JSON.stringify(cartProductsTmp));

        setCart([])
    }

    useEffect(()=> {
        if(cart.length === 0) {
            const data = products.filter(product => { cartProducts.includes(product.id) 
                { if(cartProducts.includes(product.id)) {
                    product.quantity = 1
        
                    return true
                }
        
                return false
                }
            })
            setCart([...data])
        }  
    }, [cartProducts])
  
    return (
        <div className="cart__page">
            {(cart.length === 0) ? (<h2 className="cart__page-title">Your shopping cart is empty</h2>) :  cart.map((product, index) => (
                <div key={index} className="cart__page_item">
                    <div className="item__image"><img src={product.image} alt="" /></div>
                    <div className="item__title">{product.title}
                    <p>Price: {product.price} $</p></div>
                    <div className="count__block">
                        <button onClick={(event) => {setQuantity(event, index, product.id)}} className="btn__minus">-</button>
                        <input type="number" defaultValue={product.quantity}/>
                        <button onClick={(event) => {setQuantity(event, index, product.id)}} className="btn__plus">+</button>
                    </div>
                    <div className="item__price__block">
                       $ {(product.quantity * product.price).toFixed(2)}
                    </div>
                    <button onClick={() => removeProduct(index, product.id)} className="item__btn_delete"></button>
                </div>
                
            )) }
          
        </div>
    )
}

const CartWidget = () => {
    const {cartProducts} = useContext(AppContext)
    
    return(
        <div className="header__cart-widget">
            <NavLink to="/cart"><img src={iconCart} alt="cart" /></NavLink>
            <span>{cartProducts.length}</span>	
		</div>
    )
}
export {CartWidget}
export default Cart