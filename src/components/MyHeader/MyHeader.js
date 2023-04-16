import React, {useEffect, useState} from 'react';
import "./MyHeader.css";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {cartDataSelector} from "../../redux/slices/cartSlice";

const MyHeader = () => {

    const [cartCount,setCartCount]=useState(0)

    const cartData=useSelector(cartDataSelector)

    useEffect(()=>{
        setCartCount(cartData.length)
    },[cartData])



    return (
        <header>

            <Link to='/'>Главная</Link>
            <Link to='/cart'>Корзина <FontAwesomeIcon icon={faShoppingCart} />
                {cartCount ? <div className="cart-count">{cartCount}</div>:''}

            </Link>



        </header>
    );
};

export default MyHeader;