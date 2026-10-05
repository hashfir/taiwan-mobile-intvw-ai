import React, { useState, useMemo } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import { useCart } from './hooks/useCart';
import { ProductCard } from './components/ProductCard';
import { CartSidebar } from './components/CartSidebar';
import { ModalDialog } from './components/ModalDialog';
import { NotificationToast } from './components/NotificationToast';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import './App.css';

export default function App() {
  const {
    cart,
    notifications,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalQuantity,
    totalPrice,
    removeNotification,
    addNotification
  } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modal dialog states
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: () => {}
  });

  // Feature 4: Search & Filter functionality
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    return ['All', ...new Set(INITIAL_PRODUCTS.map((p) => p.category))];
  }, []);

  // Request Remove Dialog (Feature 1)
  const handleRequestRemove = (product) => {
    setModalConfig({
      isOpen: true,
      title: '確認移除商品',
      message: `確定要從購物車中移除「${product.name}」嗎？`,
      type: 'danger',
      onConfirm: () => {
        removeFromCart(product.id);
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Request Checkout Dialog (Feature 1)
  const handleRequestCheckout = () => {
    setModalConfig({
      isOpen: true,
      title: '確認結帳',
      message: `您的訂單總計 NT$ ${totalPrice.toLocaleString()} (${totalQuantity} 件商品)。確定要進行結帳嗎？`,
      type: 'primary',
      onConfirm: () => {
        clearCart();
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
        setIsCartOpen(false);
        addNotification('🎉 結帳成功！感謝您的購買。', 'success');
      }
    });
  };

  return (
    <div className="app-container">
      {/* Toast Notifications (Feature 2) */}
      <NotificationToast notifications={notifications} onDismiss={removeNotification} />

      {/* Confirmation Modal Dialog (Feature 1) */}
      <ModalDialog
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onCancel={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Main Header */}
      <header className="main-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-logo">🛍️</span>
            <h1>精品數位商城</h1>
          </div>

          {/* Search Box (Feature 4) */}
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="搜尋商品名稱..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>

          {/* Cart Icon & Total Quantity Badge (Feature 3) */}
          <button
            className="cart-badge-button"
            onClick={() => setIsCartOpen(true)}
            aria-label="開啟購物車"
          >
            <ShoppingCart size={22} />
            <span className="cart-badge-label">購物車</span>
            <span className="cart-badge-count">{totalQuantity}</span>
          </button>
        </div>
      </header>

      {/* Filter and Content Container */}
      <main className="main-content">
        <div className="filter-section">
          <div className="category-pills">
            <Filter size={16} className="filter-icon" />
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? '全部商品' : cat}
              </button>
            ))}
          </div>
          <span className="results-count">共 {filteredProducts.length} 項商品</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>🔍 找不到符合「{searchTerm}」的商品</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onUpdateQuantity={updateQuantity}
        onRequestRemove={handleRequestRemove}
        onRequestCheckout={handleRequestCheckout}
      />
    </div>
  );
}
