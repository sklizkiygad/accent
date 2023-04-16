import React from 'react';
import './MainPage.css';
import MyHeader from "../../components/MyHeader/MyHeader";
import FiltersSide from "../../components/FiltersSide/FiltersSide";
import ProductsList from "../../components/ProductsList/ProductsList";

const MainPage = () => {
    return (
        <div className="main-page">
            <MyHeader/>

            <div className="filter-products">

                <FiltersSide/>
                <ProductsList/>


            </div>

            
        </div>
    );
};

export default MainPage;