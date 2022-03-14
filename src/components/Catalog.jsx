import React from "react"
import {  useState, useContext, useRef  } from "react"
import { ProductCard } from "./Product"
import {AppContext} from "../App"

const Catalog = () => {

    const {products, setProducts, sliderUl, cartProducts, addToCart} = useContext(AppContext)
    const [sortStarus, setSortStatus] = useState(false)
    const btnNext = useRef()

    function prevNext(event) {
        
        const ul = sliderUl.current;
        const dir = (event.target !== btnNext.current) ? 'prev' : 'next'

        let x = ul.style.transform;
        x = x.replace('translateX(', '').replace('px)', '');

        if(!x) x = 0
        x = Math.abs(+x)

        let stop = (products.length*360) - ul.offsetWidth + 360

            x+=360 * (dir === 'prev' ? -1 : 1)

        if (x <= stop) ul.style.transform = `translateX(-${x}px)` 
    }

    function sort() {
        let productsTmp = products
        
        sliderUl.current.style = ""

        productsTmp.sort((a,b) => {
            return a.price - b.price
        })

        setSortStatus(!sortStarus)
        if(sortStarus) productsTmp.reverse();
        setProducts([...productsTmp])

    }

    return(
        <div className="catalog">
			<div className="catalog__header">
				<h2>Catalog</h2>
				<button onClick={sort} className="catalog__btn_sort"></button>

				<div className="catalog__slider_btns">
					<button onClick={prevNext} className="btns_prev"></button>
					<button ref={btnNext} onClick={prevNext} className="btns_next"></button>
				</div>
			</div>

			<ul ref={sliderUl} className="catalog__products_list">
                { products.map((product, index) => {
                    let added = (cartProducts.indexOf(product.id) !== -1) ? 'added' : ''
                    return <ProductCard key={index} 
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    id={product.id}
                    category={product.category}
                    addToCart={addToCart}
                    added={added}/>
                }) }
			</ul>
			</div>
    )
}

export default Catalog