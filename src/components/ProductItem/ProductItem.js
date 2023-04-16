import React, {useEffect, useState} from 'react';
import "./ProductItem.css";
import {useDispatch, useSelector} from "react-redux";
import {addCartData, cartDataSelector, removeCartData} from "../../redux/slices/cartSlice";



const ProductItem = ({productData}) => {

    const productItemImage=require(`../../assets${productData.image}`);
    const cartDataInStorage=useSelector(cartDataSelector);
    const [isProductInStorage,setIsProductInStorage]=useState(false)

    const dispatch=useDispatch();

    const addToCart=(dataCart)=>{
        dispatch(addCartData(dataCart))
    }
    const removeFromCart=(dataCart)=>{
        dispatch(removeCartData(dataCart))
    }

    const checkItemInStorage=()=>{
        if(cartDataInStorage.find(item=>item.id == productData.id)){
            setIsProductInStorage(true)
        }
        else{
            setIsProductInStorage(false)
        }
    }

    useEffect(()=>{
        checkItemInStorage();
    },[cartDataInStorage])

    return (
        <div className="product-item">
            <img src={productItemImage} alt=""/>
            <div className="product-item__info">
            <h3>{productData.title}</h3>
                <p>Тип: <span>{productData.type}</span></p>
                <p>Цена: <span>{productData.regular_price.value} {productData.regular_price.currency}</span></p>
            </div>

            {isProductInStorage?
                <button className="main-button nocolor" onClick={()=>removeFromCart(productData)}>Убрать из корзины</button>:
                <button className="main-button" onClick={()=>addToCart(productData)}>Добавить в корзину</button>
            }





        </div>
    );
};

export default ProductItem;