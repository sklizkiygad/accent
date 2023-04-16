import React from 'react';
import CartProductItem from "../CartProductItem/CartProductItem";
import {useDispatch, useSelector} from "react-redux";
import {cartDataSelector, setIsOpenModal, setStatusRequest} from "../../redux/slices/cartSlice";
import './CartProductsList.css'
import {Link} from "react-router-dom";
const CartProductsList = () => {

    const cartData=useSelector(cartDataSelector);

    const dispatch=useDispatch()

    const openModal=()=>{
        dispatch(setIsOpenModal(true))
        dispatch(setStatusRequest(null))
    }

    return (
        <div className="cart-products-list">
            <ul>
            {cartData.length ?
                cartData.map(product=>{
                    return <li  key={product.id}><CartProductItem cartProduct={product}/></li>
                }):
                <h2>Пустая корзина</h2>
            }
            </ul>
            {cartData.length ?
            <button className="main-button" onClick={openModal}>Оформить заказ</button>:
               <Link to='/'><button className="main-button">На главную</button></Link>
            }

        </div>
    );
};

export default CartProductsList;