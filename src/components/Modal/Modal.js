import React from 'react';
import "./Modal.css";
import {useDispatch} from "react-redux";
import {setIsOpenModal} from "../../redux/slices/cartSlice";
const Modal = ({children}) => {

    const dispatch = useDispatch()
    const closeModal = () =>{
        dispatch(setIsOpenModal(false))
    }


    return (

        <div className="modal" onClick={closeModal}>
            <div className="modal__content" onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>


    );
};

export default Modal;