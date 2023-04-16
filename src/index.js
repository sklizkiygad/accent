import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,RouterProvider} from "react-router-dom";
import {router} from "./router/router";
import './assets/css/style.css'
import { Provider } from 'react-redux'
import store from "./redux/store";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <Provider store={store}>
      <BrowserRouter router={router} />
      </Provider>

);


