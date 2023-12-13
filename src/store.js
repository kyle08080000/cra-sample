// 專門狀態管理的文件
import { createContext } from "react";

// // 先將單一品項金額＊數量算出
// const array = cartList.map((item) => {
//   return item.quantity * item.price;
// });
// // 最後透過 reduce將陣列內所有金額加總
// const total = array.reduce((a, b) => {
//   return a + b;
// }, 0)
// 縮寫後
function calculateTotalPrice(cartList) {
  return cartList.map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);
}

export const cartInit = {
  cartList: [], // 預設狀態
}

export const cartReducer = (state, action) => {
  const cartList = [...state.cartList];
  // 1. 先取得當前購物車目標品項索引
  const index = cartList.findIndex((item) => item.id === action.payload.id);
    switch (action.type) {
      // 加入購物車
      case 'ADD_TO_CART':
        if (index === -1) { 
          // 代表還未加入購物車內
          cartList.push(action.payload);
        } else {
          // 當前購物車已有項目的位置
          cartList[index].quantity += action.payload.quantity;
        }
        return {
          ...state,
          cartList,
          total: calculateTotalPrice(cartList), // 金額總計計算機。以使用重構的方式移到最下方
        }
        // 購物車 商品數量選單
      case 'CHANGE_CART_QUANTITY':
        // 直接傳入選擇的數量
        cartList[index].quantity = action.payload.quantity;
        
        return {
          ...state,
          cartList,
          total: calculateTotalPrice(cartList), // 金額總計計算機。以使用重構的方式移到最下方
        }
      case 'REMOVE_CART_ITEM':
        cartList.splice(index, 1);
        return {
          ...state,
          cartList,
          total: calculateTotalPrice(cartList), // 金額總計計算機。以使用重構的方式移到最下方
        }
      default:
        return state
    }
}

export const CartContext = createContext({})

