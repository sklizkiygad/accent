import React from 'react';
import "./CartProductItem.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {cartDataSelector, changeCountInCart, removeCartData} from "../../redux/slices/cartSlice";

const CartProductItem = ({cartProduct}) => {
    const productItemImage=require(`../../assets${cartProduct.image}`);

    const dispatch=useDispatch()
    const cartData=useSelector(cartDataSelector)




    const addCount=(productId)=>{
       const objIndex = cartData.findIndex(item=>item.id==productId);
       const addCount= cartData[objIndex].countInCart+1
        dispatch(changeCountInCart({id:productId,value:addCount}))

    }
    const removeCount=(productId)=>{
            const objIndex = cartData.findIndex(item=>item.id==productId);
            if(cartData[objIndex].countInCart>1){
                const removeCount= cartData[objIndex].countInCart-1
                dispatch(changeCountInCart({id:productId,value:removeCount}))
            }
    }

    const deleteItem = (e) => {
        dispatch(removeCartData({id:e}))
    }

    const getActualValue=()=>{
        return cartData[cartData.findIndex(item=>item.id==cartProduct.id)].countInCart
    }

    return (
        <div className="cart-product-item">

            <img src={productItemImage} alt=""/>

            <div className="cart-product-item__info">
                <div className="cart-product-item__info__text">
                <p>Наименование: <span>{cartProduct.title}</span></p>

                <p>SKU: <span>{cartProduct.type}</span></p>


                <p>Цена за 1 шт: <span>{cartProduct.regular_price.value} {cartProduct.regular_price.currency}</span></p>
                </div>

            </div>

            <div className="cart-product-item__counter">

                <button onClick={()=>removeCount(cartProduct.id)}><FontAwesomeIcon icon={faMinusCircle}/></button>
                <input type="number" value={getActualValue()}  max={100} min={1} onInput={(e)=>dispatch(changeCountInCart({id:cartProduct.id,value:e.target.value}))}/>
                <button onClick={()=>addCount(cartProduct.id)}><FontAwesomeIcon icon={faPlusCircle}/></button>

            </div>
            <button className="main-button nocolor cart-button" onClick={()=>deleteItem(cartProduct.id)}>Удалить</button>


        </div>
    );
};

export default CartProductItem;