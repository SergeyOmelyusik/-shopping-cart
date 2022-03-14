import React from "react"
import { NavLink } from "react-router-dom"
import { useRef, useContext } from "react/cjs/react.development"
import { AppContext } from "../App"
import { CartWidget } from "./Cart"

const Header = () => {

    const input = useRef()
    const {setProducts, sliderUl} = useContext(AppContext)
    let localData = localStorage.getItem('localData')
    if(localData) localData = JSON.parse(localData)

    function search() {

        if(!localData || localData.length === 0 ) return

        sliderUl.current.style = ""

        const value = input.current.value.toLowerCase()

        let productsTmp = localData.filter(product => {
            return product.title.toLowerCase().indexOf(value) !== -1
        })
        setProducts([...productsTmp])
    }

return(
    <header className="header">
        <div className="header__logo">
            <NavLink to="/">Diamond</NavLink>	
        </div>

        <div className="header__search">
            <input ref={input} onChange={search} type="text" placeholder="Search" />
        </div>
        
        <CartWidget />
    </header>
)
}

export default Header