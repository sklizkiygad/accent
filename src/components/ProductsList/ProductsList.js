import React, {useEffect, useState} from 'react';
import "./ProductsList.css";
import dataProducts from "../../assets/products.json";
import ProductItem from "../ProductItem/ProductItem";
import {useDispatch, useSelector} from "react-redux";
import {

    currentFiltersSelector,
    currentPageSelector, pagesCountSelector, setCurrentPage,
    setPagesCount, setSelectedBrandsFilter, setTitleFilter
} from "../../redux/slices/cartSlice";
const ProductsList = () => {



    const pages=useSelector(pagesCountSelector)
    const currentPage=useSelector(currentPageSelector)





    const itemsLimit=6;

    const cartFilters= useSelector(currentFiltersSelector);

    const [dataProductsWithFilters,setDataProductsWithFilters]=useState([])

    const dispatch=useDispatch()



    const changePage=()=>{
        const c = document.querySelector('.pagination')
        const indexs = Array.from(document.querySelectorAll('.pagination__index'))
        const svgCurrent = document.querySelectorAll('.pagination svg')
        let cur = -1
        indexs.forEach((index, i) => {
            index.addEventListener('click', (e) => {

                dispatch(setCurrentPage(e.target.getAttribute('data-page')))

                // clear
                c.className = 'pagination'
                void c.offsetWidth; // Reflow
                c.classList.add('open')



                svgCurrent[0].style.transform=`translateX(${((i)*50)-(i+1)}px)`
                svgCurrent[1].style.transform=`translateX(${((i)*50)-(i+1)}px)`

               // c.classList.add(`i${i + 1}`)


                if (cur > i) {
                    c.classList.add('flip')
                }
                cur = i
            })
        })
    }

    const showPagination=()=>{

        let pagesArray=[]
            for(let i=0; i<pages; i++){
                pagesArray.push(<div key={i+1} data-page={i+1} className="pagination__index">{i+1}</div>)
            }
        return(pagesArray)
    }

    const checkPagination=()=>{

        if(dataProductsWithFilters.length>itemsLimit){
            dispatch(setPagesCount(Math.ceil(dataProductsWithFilters.length/itemsLimit)))

        }
        else{
            dispatch(setPagesCount(0))

        }
    }


    useEffect(()=>{
        if(pages){
            changePage()
            showPagination()
        }

    },[pages])

    useEffect(()=>{
        setDataProductsWithFilters(dataProducts)

    },[dataProducts])

    useEffect(()=>{
        checkPagination()
    },[dataProductsWithFilters])

    const setFiltration=()=>{

        setDataProductsWithFilters(
            dataProducts
                .filter(product=>{
                    if(cartFilters.minPrice && cartFilters.maxPrice){
                        return product.regular_price.value>=cartFilters.minPrice &&
                            product.regular_price.value <= cartFilters.maxPrice
                    }
                    else{
                        return  true
                    }

                })
                .filter(product=>{
                    if(cartFilters.selectedBrands.length){
                        return  cartFilters.selectedBrands.includes(product.brand+'')
                    }
                    else{
                        return true
                    }

                })

                .filter(product=>{
                        return product.title.toLowerCase().includes(cartFilters.title.toLowerCase().trim())
                })
        )
    }

    useEffect(()=>{

            setFiltration()
    },[cartFilters])




    const cancelAllFilters=()=>{
        dispatch(setCurrentPage(1))
        dispatch(setTitleFilter(''))
        dispatch(setSelectedBrandsFilter([]))
    }





    return (
        <div>
        <div className="products-list">

            {dataProductsWithFilters.length? dataProductsWithFilters.map((product,index)=>{

                if(index < itemsLimit*currentPage && index > (itemsLimit*(currentPage-1))-1){
                    return <ProductItem key={index} productData={product}/>
                }

            }):
                <button className="main-button nocolor" onClick={cancelAllFilters}>сбросить фильтры</button>
            }
        </div>

            {pages ?
                <div className="pagination">
                <span>
                    {showPagination()}
                </span>
                    <svg viewBox="0 0 100 100">
                        <path
                            d="m 7.1428558,49.999998 c -1e-7,-23.669348 19.1877962,-42.8571447 42.8571442,-42.8571446 23.669347,0 42.857144,19.1877966 42.857144,42.8571446"/>
                    </svg>
                    <svg viewBox="0 0 100 100">
                        <path
                            d="m 7.1428558,49.999998 c -1e-7,23.669347 19.1877962,42.857144 42.8571442,42.857144 23.669347,0 42.857144,-19.187797 42.857144,-42.857144"/>
                    </svg>
                </div>:''
            }



            

        </div>
    );
};

export default ProductsList;