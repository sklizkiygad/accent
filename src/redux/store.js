import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {cartSlice} from "./slices/cartSlice";


const reducer = combineReducers({
        cart:cartSlice.reducer
    })

 const store = configureStore({
    reducer: reducer,
})

export default store