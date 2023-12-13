import { useContext } from "react"
import { CartContext } from "../store"


export default function Cart() {

  const [state, dispatch] = useContext(CartContext);

  return (
    <div className="bg-light p-3">
      <table className="table table-light align-middle">
        <tbody>
          {state.cartList.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <button type="button" className="btn btn-sm"
                  onClick={() => {
                    dispatch({
                      type: 'REMOVE_CART_ITEM',
                      payload: {
                        ...item,
                      }
                    })
                  }}>x</button>
                </td>
                <td>
                  <img src={item.img}
                    className="table-image"
                    alt="" />
                </td>
                <td>
                  {item.title}
                  <br />
                  <small className="text-muted">NT ${item.price}</small>
                </td>
                <td>
                  <select name="" id="" className="form-select" // 下拉選單
                  value={item.quantity} 
                  onChange={(e) => {
                    e.preventDefault();
                    const quantity = parseInt(e.target.value); // 如果不轉型傳回去的會是字串，會造成下次加入購物車金額錯誤
                    dispatch({
                      type: 'CHANGE_CART_QUANTITY',
                      payload: {
                        ...item,
                        quantity,
                      }
                    })
                  }}>
                    {[...Array(20)].map((_, index) => { // 只接使用[...Array(20)]創建一個新的空陣列
                      // 因為使用[...Array(20)]的方式，陣列裡面20個的值的會是空的，所以用_表示
                      return (
                        // 陣列索引值從０開始，而商品數量不能是０，所以要加１
                        <option value={index+1} key={index}>{index + 1}</option>
                      )
                    })}
                  </select>
                </td>
                <td className="text-end">
                  NT ${item.price * item.quantity}
                </td>
              </tr>
            )
          })}
          
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="text-end">
              總金額 NT$ {state.total || 0}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}