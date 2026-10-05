import { useState, useCallback } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Toast notification system
  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Add item to cart (Feature 2)
  const addToCart = useCallback((product, amount = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + amount
        };
        return updated;
      }
      return [...prevCart, { product, quantity: amount }];
    });
    addNotification(`已將 ${product.name} (x${amount}) 加入購物車！`, 'success');
  }, [addNotification]);

  // Update quantity (Supports single or multiple steps) (Feature 5)
  const updateQuantity = useCallback((productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, []);

  // Remove item directly from cart
  const removeFromCart = useCallback((productId) => {
    const targetItem = cart.find(item => item.product.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    if (targetItem) {
      addNotification(`已從購物車移除 ${targetItem.product.name}`, 'info');
    }
  }, [cart, addNotification]);

  // Clear cart on checkout
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculated totals (Feature 3)
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
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
  };
}
