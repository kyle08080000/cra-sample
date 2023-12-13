import { useContext, useState } from "react";
import productsData from "../assets/productsData";
import { CartContext } from "../store";

function Product({ product, dispatch }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        quantity: quantity
      }
    });
    setQuantity(1); // 重置數量為 1
  };
  
  return (
    <div className="col">
      <div className="card">
        <img src={product.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h6 className="card-title">
            {product.title}
            <span className="float-end">
              NT ${product.price}
            </span>
          </h6>
          <div className="row g-0">
            <div className="col-8">
              <button type="button" className="btn btn-outline-primary w-100 text-nowrap"
                onClick={addToCart}>
                加入購物車
              </button>
            </div>
            <div className="col-4">
              <select 
                className="form-select"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[...Array(20)].map((_, index) => (
                  <option value={index + 1} key={index}>{index + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="row row-cols-2 row-cols-md-3 g-3">
      {productsData.map((product) => (
        <Product key={product.id} product={product} dispatch={dispatch} />
      ))}
    </div>
  );
}

// 《代碼結構和功能》 
// 這段代碼定義了兩個 React 組件：Product 和 Products。這些組件用於顯示產品列表，並允許用戶將選擇的產品添加到購物車。

// Product 組件：負責渲染單個產品的資訊和交互界面。

    // 1 狀態管理（useState）：
    // quantity：用來追蹤用戶選擇的產品數量。初始值設為 1。

    // 2 事件處理（addToCart）：
    // 當用戶點擊「加入購物車」按鈕時，觸發 addToCart 函數。
    // 這個函數將產品資訊和選擇的數量作為 payload 發送到購物車的狀態（通過 dispatch）。
    // 然後，函數將 quantity 重置為 1。

    // 3 渲染：
    // 產品圖片、標題和價格。
    // 一個 <select> 下拉菜單，讓用戶選擇數量（1 到 20）。
    // 一個按鈕，用於加入產品到購物車。

// Products 組件：負責渲染整個產品列表。

    // 1 使用 Context（useContext）：
    // 使用 CartContext 來獲取購物車的狀態和 dispatch 函數。

    // 2 渲染產品列表：
    // 遍歷 productsData 陣列，為每個產品渲染一個 Product 組件。
    // 將 dispatch 函數和產品資訊傳遞給每個 Product 組件。

// 《代碼運作流程》
// 1 當 Products 組件渲染時，它創建了一個產品列表，其中每個產品都由一個 Product 組件表示。

// 2 在每個 Product 組件中，用戶可以通過 <select> 選擇產品數量。

// 3 點擊「加入購物車」按鈕後，當前產品和選擇的數量會被發送到購物車（使用 dispatch），並且該產品的數量選擇會重置為 1。

// 4 由於每個 Product 組件都有自己的 quantity 狀態，所以它們的數量選擇是獨立的，不會互相影響。

// 通過這種方式，允許用戶選擇不同產品的數量並將它們添加到購物車中。