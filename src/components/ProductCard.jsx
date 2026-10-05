import React from 'react';
import { ShoppingBag, Plus } from 'lucide-react';

export function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image-box">
        <span className="product-emoji">{product.image}</span>
        <span className="product-badge">{product.category}</span>
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">⭐ {product.rating}</div>
        <div className="product-footer">
          <div className="product-price">NT$ {product.price.toLocaleString()}</div>
          <div className="button-group">
            <button
              className="btn-add-cart"
              onClick={() => onAddToCart(product, 1)}
              title="加入購物車"
            >
              <ShoppingBag size={16} />
              加入 (+1)
            </button>
            <button
              className="btn-add-multiple"
              onClick={() => onAddToCart(product, 5)}
              title="一次加入5個 (倍數測試)"
            >
              <Plus size={14} />+5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
