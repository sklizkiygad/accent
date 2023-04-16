import {Routes,Route} from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import MainPage from "./pages/MainPage/MainPage";



function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<MainPage/>}  exact/>
        <Route path="/сart" element={<CartPage />}/>
      </Routes>
    </div>
  );
}

export default App;
