import { useContext, useState, } from "react";
import productsData from "../assets/productsData";
import { CartContext } from "../store";
import QuantityModal from "./QuantityModal"; // 按下加入購物車彈出的模組


function Product({ product, dispatch, cartQuantity, state }) {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  
  const isOutOfStock = product.stock === 0;

  const addToCart = (selectedQuantity) => {
    // 如果商品不是０的話才執行。在加入購物車按鈕已有判斷，如果商品是０則禁用按鈕。
    if (!isOutOfStock) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...product,
          quantity: selectedQuantity // 使用從 Modal 傳過來的數量
        }
      });
      setQuantity(1); // 重置數量為 1
      setShowModal(false); // 關閉 Modal
    } else {
      alert('太多了')
    }
  }

  return (
    <div className="col">
      <div className="card">
        <img src={product.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="row row-cols-1">
            <div className="col">
              <h6 className="card-title">
                {product.title}
              </h6>
            </div>
            <div className="col">
              <span className="d-block mb-2">
                  NT ${product.price}
              </span>
            </div>
          </div>
          <div className="row g-0 row-cols-1">
            <div className="col">
              <button // 在這裡如果商品是０則禁用按鈕
                type="button"
                className={`btn btn-outline-primary w-100 text-nowrap ${isOutOfStock ? 'disabled' : ''}`}
                onClick={() => isOutOfStock ? null : setShowModal(true)}
              >
                {isOutOfStock ? '已售完' : '加入購物車'}
              </button>
            </div>
            <div className="col">
              <QuantityModal 
                product={product}
                showModal={showModal} 
                onClose={() => setShowModal(false)} 
                onConfirm={(selectedQuantity) => addToCart(selectedQuantity)} // 將選擇的數量從 QuantityModal傳回來這裡
                maxQuantity={product.stock} // 商品最大數量
                cartQuantity={cartQuantity} // 購物車已有的數量
              />
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
        <Product key={product.id} product={product} dispatch={dispatch} state={state} />
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