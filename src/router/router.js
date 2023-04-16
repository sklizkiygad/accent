import {createBrowserRouter, createHashRouter} from "react-router-dom"
import React from "react";
import MainPage from "../pages/MainPage/MainPage";
import CartPage from "../pages/CartPage/CartPage";
export const router = createHashRouter([
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path: "/cart",
        element: <CartPage/>,
    },
]);