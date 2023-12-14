// 按下加入購物車彈出的模組
import { useState, useEffect, useRef } from "react";
import { Modal } from 'bootstrap';

export default function QuantityModal({ product, showModal, onClose, onConfirm, maxQuantity, cartQuantity }) {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // 初始化 Bootstrap 模態框
    modalInstance.current = new Modal(modalRef.current);
  
    // 綁定事件監聽器
    const modalCurrent = modalRef.current;
    modalCurrent.addEventListener('hidden.bs.modal', onClose);
  
    return () => {
      // 解除事件監聽器，使用 modalCurrent 參考
      modalCurrent.removeEventListener('hidden.bs.modal', onClose);
      // 確保模態框隱藏
      if (modalInstance.current) {
        modalInstance.current.hide();
      }
    };
  }, [onClose]);
  /** 將 onClose 加入依賴陣列 
   * 在您的 useEffect 函數中，有可能 modalRef.current 在清理函數運行時變成 null。
   * 這是因為 React 在組件卸載時會清除 ref 的當前值。
   * 要解決這個問題，您需要在 useEffect 函數的函數體內創建一個變數來持有 modalRef.current 的值，並在返回的清理函數中使用該變數。 */
  useEffect(() => {
    if (showModal && modalRef.current) {
      modalInstance.current.show();
    } else if (modalInstance.current) {
      modalInstance.current.hide();
    }
  }, [showModal]);
  /** 這樣可以確保在嘗試顯示或隱藏模態框時，相關的 DOM 元素存在。
   * 另一個要點是在使用 Bootstrap 的 JavaScript 插件與 React 時要小心，
   * 因為 Bootstrap 的插件通常會直接操作 DOM，這可能與  React 的虛擬 DOM 機制相沖突。
   * 在某些情況下，您可能需要使用 useState 或 useEffect 來確保 DOM 節點已準備就緒並且可以安全地操縱。
   */

  // 送出按鈕 綁定的功能
  const handleConfirm = () => {
    onConfirm(quantity); // 這裡的 onConfirm 現在會傳遞選擇的數量
    setQuantity(1); // 模組裡商品選擇數量 重置數量為 1
    modalInstance.current.hide(); // 隱藏模態框
  };

  return (
  <>
    <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row row-cols-1 gy-2">
              <div className="col">
                <img src={product.img} className="card-img-top" alt="" />
              </div>
              <div className="col">
                <h6>
                  請選擇數量
                  <span className="float-end">商品剩餘：{maxQuantity}</span>
                </h6>
              </div>
            </div>
            <select 
              className="form-select"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(parseInt(e.target.value), maxQuantity))}
            >
              {[...Array(maxQuantity)].map((_, index) => (
                <option value={index + 1} key={index}>{index + 1}</option>
              ))}
            </select>
            <div className="row row-cols-1 mt-3">
              <div className="col">
                <h6>產品描述：</h6>
              </div>
              <div className="col">
                <p>
                  一個理想的健康早餐時刻，讓您在新的一天注入活力和營養。想像您坐在充滿晨光的廚房裡，一邊享受著盛滿新鮮漿果、香甜水果和綿密優格的滋味，一邊感受那些水果爆發出的自然甜味和豐富的口感。隨著每一口，您不僅在品嚐美食，更在為您的身體補充必需的維他命和礦物質。旁邊是一杯溫熱的咖啡，其上面藝術性的拉花不僅討喜，更是您早晨沉思時刻的完美伴侶。這不僅僅是一餐早餐，這是一種生活態度的展現，是對健康、對生活品質的追求。讓這樣的早餐開啟您充滿活力的一天吧！
                </p>

              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
            <button type="button" className="btn btn-primary" onClick={handleConfirm}>確認</button>
          </div>
        </div>
      </div>
    </div>

  </> 
  );
}