import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export function CartSidebar({
  isOpen,
  onClose,
  cart,
  totalQuantity,
  totalPrice,
  onUpdateQuantity,
  onRequestRemove,
  onRequestCheckout
}) {
  return (
    <div className={`cart-sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className="cart-backdrop" onClick={onClose} />
      <aside className="cart-sidebar">
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={22} />
            <h2>購物車 ({totalQuantity})</h2>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="關閉購物車">
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="empty-icon">🛒</span>
              <p>您的購物車目前是空的</p>
            </div>
          ) : (
            <ul className="cart-list">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <div className="cart-item-avatar">{product.image}</div>
                  <div className="cart-item-info">
                    <h4>{product.name}</h4>
                    <span className="cart-item-price">NT$ {product.price.toLocaleString()}</span>
                    
                    {/* Quantity controls supporting single (+1/-1) and multiple (+5/-5) steps */}
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => onUpdateQuantity(product.id, -5)} title="-5">-5</button>
                      <button className="qty-btn" onClick={() => onUpdateQuantity(product.id, -1)} title="-1">-1</button>
                      <span className="qty-value">{quantity}</span>
                      <button className="qty-btn" onClick={() => onUpdateQuantity(product.id, 1)} title="+1">+1</button>
                      <button className="qty-btn" onClick={() => onUpdateQuantity(product.id, 5)} title="+5">+5</button>
                    </div>
                  </div>
                  
                  <button
                    className="btn-remove-item"
                    onClick={() => onRequestRemove(product)}
                    title="移除商品"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>總數量：</span>
              <strong>{totalQuantity} 件</strong>
            </div>
            <div className="cart-summary-row total-row">
              <span>總金額：</span>
              <strong className="price-highlight">NT$ {totalPrice.toLocaleString()}</strong>
            </div>
            <button className="btn-checkout" onClick={onRequestCheckout}>
              立即結帳
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
