import React, {useState} from 'react';
import "./SendForm.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {cartDataSelector, clearCartData, setIsOpenModal, setStatusRequest} from "../../redux/slices/cartSlice";
const SendForm = () => {

    const [firstNameInput,setFirstNameInput]=useState('');
    const [secondNameInput,setSecondNameInput]=useState('');
    const [emailInput,setEmailInput]=useState('');

    const cartData=useSelector(cartDataSelector)
    const dispatch=useDispatch()
    const  sendForm = async ()=>{


        const sendData={
            firstName:firstNameInput,
            secondName:secondNameInput,
            email:emailInput,
            cart:cartData
        }


    await axios.post(`https://app.aaccent.su/js/confirm.php`,)
        .then((res)=>{
           dispatch(setStatusRequest(res.status))
            setTimeout(()=>{
                dispatch(setStatusRequest(null))
                dispatch(setIsOpenModal(false))
                dispatch(clearCartData())
            },2000)

    }).catch((err)=>{
        alert(err)
        })
    }

    return (
        <form className="send-form" onSubmit={(e)=>e.preventDefault}>
            <div className="title">Заказ</div>
            <div className="subtitle">Заполните анкету для заказа</div>
            <div className="input-container ic1">
                <input id="firstname" onInput={(e)=>setFirstNameInput(e.target.value)} className="input" type="text" placeholder=" "/>
                <div className="cut"></div>
                <label htmlFor="firstname" className="placeholder">Имя</label>
            </div>
            <div className="input-container ic2">
                <input id="lastname" onInput={(e)=>setSecondNameInput(e.target.value)} className="input" type="text" placeholder=" "/>
                <div className="cut"></div>
                <label htmlFor="lastname" className="placeholder">Фамилия</label>
            </div>
            <div className="input-container ic2">
                <input id="email" onInput={(e)=>setEmailInput(e.target.value)} className="input" type="text" placeholder=" "/>
                <div className="cut cut-short"></div>
                <label htmlFor="email" className="placeholder">Email</label>
            </div>
            <button type="button" className="submit"  onClick={sendForm}>Отправка</button>

        </form>
    );
};

export default SendForm;