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
        currentPage:1,
        isOpenModal:false,
        statusRequest:null
    },

    reducers: {
        addCartData:(state,action)=>{
            const newItem={...action.payload,countInCart:1}
            if(!state.cartData.includes(newItem)){
                state.cartData=[...state.cartData,newItem]
            }
        },
       removeCartData:(state,action)=>{
           const objIndex = state.cartData.findIndex(item=>item.id === action.payload.id);
           state.cartData.splice(objIndex,1);
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

        changeCountInCart:(state,action)=>{
            const objIndex = state.cartData.findIndex(item=>item.id === action.payload.id);
            state.cartData[objIndex].countInCart=action.payload.value
        },
        setIsOpenModal:(state,action)=>{
            state.isOpenModal=action.payload
        },
        setStatusRequest:(state,action)=>{
            state.statusRequest=action.payload
        },
        clearCartData:(state)=>{
            state.cartData=[]
        }





}})


// Action creators are generated for each case reducer function
export const { addCartData,
    removeCartData,
    setMinPriceFilter,
    setMaxPriceFilter,
    setTitleFilter,
    setSelectedBrandsFilter,
    setCurrentPage,
    setPagesCount,
    changeCountInCart,
    setIsOpenModal,
    setStatusRequest,
    clearCartData

} = cartSlice.actions

export const cartDataSelector=(state)=>state.cart.cartData
export const currentFiltersSelector=(state)=>state.cart.currentFilters
export const pagesCountSelector=(state)=>state.cart.pagesCount
export const currentPageSelector=(state)=>state.cart.currentPage
export const isOpenModalSelector=(state)=>state.cart.isOpenModal
export const statusRequestSelector=(state)=>state.cart.statusRequest
export default cartSlice.reducer