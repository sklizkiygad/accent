import React, {useEffect, useState} from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import './FiltersSide.css';
import dataProducts from "../../assets/products.json";
import dataBrands from "../../assets/brands.json";
import {useDispatch, useSelector} from "react-redux";
import {
    cartDataSelector, currentFiltersSelector,
    setCurrentPage,
    setMaxPriceFilter,
    setMinPriceFilter,
    setSelectedBrandsFilter,
    setTitleFilter
} from "../../redux/slices/cartSlice";

const FiltersSide = () => {



    const dispatch=useDispatch();

    const [minPrice,setMinPrice]=useState(0);
    const [maxPrice,setMaxPrice]=useState(0);

    const [currentMinPrice,setCurrentMinPrice]=useState(0);
    const [currentMaxPrice,setCurrentMaxPrice]=useState(0);


    const [currentTitle,setCurrentTitle]=useState('');

    const [currentSelectedBrands,setCurrentSelectedBrands]=useState([]);

    const filtersData=useSelector(currentFiltersSelector)








    const getPrices=()=>{
        let arraySort=dataProducts.sort((a,b) => (a.regular_price.value - b.regular_price.value ) )
        setMinPrice(arraySort[0].regular_price.value)
        setMaxPrice(arraySort[arraySort.length-1].regular_price.value)
        setCurrentMinPrice(arraySort[0].regular_price.value)
        setCurrentMaxPrice(arraySort[arraySort.length-1].regular_price.value)
    }

    // const setFiltersInStorage=()=>{
    //     dispatch(setMinPriceFilter(currentMinPrice));
    //     dispatch(setMaxPriceFilter(currentMaxPrice));
    // }

    useEffect(()=>{
        setAllFiltersInStorage();
    },[])


    useEffect(()=>{
        if(dataProducts){
            getPrices()
        }

    },[dataProducts])





    // const setTitleInStorage=()=>{
    //     dispatch(setTitleFilter(currentTitle))
    // }
    //
    // useEffect(()=>{
    //     setTitleInStorage()
    // },[currentTitle])

   const  setNewSelectedBrands=(e)=>{


       if(e.target.checked && !currentSelectedBrands.includes(e.target.value)) {
           setCurrentSelectedBrands(prev=>[...prev,e.target.value])

       }
       else if(!e.target.checked ){
           setCurrentSelectedBrands(prev=>prev.filter(item => item != e.target.value))

       }


       }


       // useEffect(()=>{
       //     dispatch(setSelectedBrandsFilter(currentSelectedBrands))
       // },[currentSelectedBrands])

    const setAllFiltersInStorage=()=>{
        dispatch(setCurrentPage(1))
        dispatch(setMinPriceFilter(currentMinPrice));
        dispatch(setMaxPriceFilter(currentMaxPrice));
        dispatch(setTitleFilter(currentTitle))
        dispatch(setSelectedBrandsFilter(currentSelectedBrands))


    }

    const cancelAllFilters=()=>{
        dispatch(setCurrentPage(1))
        setCurrentTitle('');
        setCurrentSelectedBrands([]);
        dispatch(setTitleFilter(''))
        dispatch(setSelectedBrandsFilter([]))
    }

    useEffect(()=>{
        setCurrentTitle(filtersData.title)
        setCurrentSelectedBrands(filtersData.selectedBrands)
    },[filtersData])






    return (
        <div className="filters-side">

            <input className="filters-side__search" type="text" placeholder="Поиск..." onChange={(e)=>setCurrentTitle(e.target.value)} value={currentTitle}/>
            <h4>Фильтры</h4>

            <div className="filters-side__filter brands">
                <h5>Бренды</h5>

                {dataBrands.map((brand,index)=>{
                    return (<div className="brands__item" key={index}>
                        <label> <input type="checkbox" value={brand.id} onChange={setNewSelectedBrands} checked={currentSelectedBrands.includes(brand.id+'')}/>{brand.title}</label>
                    </div>)
                })}

            </div>

            <div className="filters-side__filter price">
                <h5>Цена</h5>
                <div className="price price-count">
                    <input type="number" disabled value={currentMinPrice} />
                    <input type="number" disabled value={currentMaxPrice} />
                </div>


                <div className="priceslider-holder">
                    {minPrice &&
                    <Nouislider

                        range={{ min: minPrice, max: maxPrice }}
                        start={[minPrice, maxPrice]}
                        step={1}
                        connect
                        onUpdate={(e)=>{setCurrentMinPrice(e[0]); setCurrentMaxPrice(e[1])}}
                    />
                    }
                </div>

            </div>

            <button className="main-button" onClick={setAllFiltersInStorage}>Применить</button>
            <button className="main-button nocolor" onClick={cancelAllFilters}>сбросить фильтры</button>

        </div>
    );
};

export default FiltersSide;