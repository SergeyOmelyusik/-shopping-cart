import React, { useContext } from "react"
import { useParams, NavLink } from "react-router-dom"
import { AppContext } from "../App"

const Product = () => {
    const {products, addToCart, cartProducts} = useContext(AppContext)
    let params = useParams()
    const product = products.find(item => item.id === +params.id)
    let added = (cartProducts.indexOf(product.id) !== -1) ? ' added' : ''
    console.log(added)
    return(
        <div className="product__page">
            <h3 className="product__page_title">{product.title}</h3>
            <div className={"product__card" + added}>
                <div className="product__card_image">
                    <img src={product.image} alt="" />
                </div>
                <div className="product__card_description">
                    <p className="product-description">
                        {product.description}
                    </p>
                    <div className="footer">
                       <button onClick={() => addToCart(product.id)} className="btn__add_cart">{ added ? "Remove from cart" : "Add to cart"}</button>
                        <div className="product__price">
                            Price: $ {product.price}
                        </div>
                    </div>
                   
                </div>
            </div>      
        </div>
    )
}
const ProductCard  = (props) => {
    return(
        <li className={"products__item product " + props.added}>
        <img className="product__image" src={props.image} alt="#" />
        <div className="product__description">
            <h3 className="product__title"> <NavLink to={"/product/" + props.id +"/"}> {props.title} </NavLink> </h3>	
            <div className="product__category">{props.category}</div>
            <div className="product__price">
                <span>$ {props.price}</span>
                <button onClick={() => props.addToCart(props.id)} className="product__cart_add"></button>
            </div>
        </div>
    </li>
    )
}
export {ProductCard}

export default Product