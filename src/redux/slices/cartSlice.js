import { createSlice ,current } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData: [],
        currentFilters:{
            minPrice:0,
            maxPrice:0,
            title:'',
            selectedBrands:[],
        },
        pagesCount:0,
        currentPage:1
    },

    reducers: {
        addCartData:(state,action)=>{


            if(!current(state.cartData).includes(action.payload)){
                state.cartData=[...state.cartData,action.payload]
                console.log(state.cartData)
            }

        },
       removeCartData:(state,action)=>{


                    state.cartData=[...state.cartData.filter(cartItem =>  cartItem.id != action.payload.id)]
                    console.log('action.payload: ',action.payload)
            },

        setMinPriceFilter:(state,action)=>{
            state.currentFilters.minPrice=action.payload

        },
        setMaxPriceFilter:(state,action)=>{
             state.currentFilters.maxPrice=action.payload

        },
        setTitleFilter:(state,action)=>{
            state.currentFilters.title=action.payload

        },
        setSelectedBrandsFilter:(state,action)=>{
            state.currentFilters.selectedBrands=action.payload

        },

        setPagesCount:(state,action)=>{
            state.pagesCount=action.payload
        },

        setCurrentPage:(state,action)=>{
            state.currentPage=action.payload
        },




}})


// Action creators are generated for each case reducer function
export const { addCartData,
    removeCartData,
    setMinPriceFilter,
    setMaxPriceFilter,
    setTitleFilter,
    setSelectedBrandsFilter,
    setCurrentPage,
    setPagesCount

} = cartSlice.actions

export const cartDataSelector=(state)=>state.cart.cartData
export const currentFiltersSelector=(state)=>state.cart.currentFilters
export const pagesCountSelector=(state)=>state.cart.pagesCount
export const currentPageSelector=(state)=>state.cart.currentPage
export default cartSlice.reducer