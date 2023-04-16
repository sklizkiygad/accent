import React from 'react';
import "./CartPage.css";
import MyHeader from "../../components/MyHeader/MyHeader";
import CartProductsList from "../../components/CartProductsList/CartProductsList";
import Modal from "../../components/Modal/Modal";
import SendForm from "../../components/SendForm/SendForm";
import {useSelector} from "react-redux";
import {isOpenModalSelector, statusRequestSelector} from "../../redux/slices/cartSlice";

const CartPage = () => {
    const isOpenModal=useSelector(isOpenModalSelector)
    const statusRequest=useSelector(statusRequestSelector)

    return (
        <div className="cart-page">
            {statusRequest}
            {isOpenModal &&
            <Modal>
                {statusRequest ?
                    <h1>Заказ успешно создан!</h1>:
                    <SendForm/>
                }

            </Modal>
            }

            <MyHeader/>
            <CartProductsList/>

        </div>
    );
};

export default CartPage;