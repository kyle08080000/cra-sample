// 最上面放 外部套件
import { useEffect, useReducer, useState } from "react";
// import axios from "axios";

// src 相關檔案
import './assets/scss/all.scss';

// components 元件（建議外部元件 寫在比 內部自定義 的前面一點的地方）
// 外部元件
import { CartContext, cartReducer, cartInit } from "./store"; // createContext在 store元件被建立！然後導入到這裡。
// 內部自定義元件
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";

// const starWarData = async () => {
//   const result = await axios.get('https://jsonplaceholder.typicode.com/photos');
//   console.log(result);
// }
// starWarData();

function App() {
  
  const reducer = useReducer(cartReducer, cartInit);

  return (
    <CartContext.Provider value={reducer}>
      <Navbar></Navbar>
      <div className="container mt-3 mb-5">
        <div className="row flex-md-row flex-column-reverse">
          <div className="col-md-7">
            <Products></Products>
          </div>
          <div className="col-md-5 mb-4">
            <Cart></Cart>
          </div>
        </div>
      </div>
    </CartContext.Provider>

  );
}


export default App;