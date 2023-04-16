import {Routes,Route} from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import MainPage from "./pages/MainPage/MainPage";
import React from "react";



function App() {
  return (

      <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/cart" element={<CartPage />} />
      </Routes>

  );
}

export default App;
