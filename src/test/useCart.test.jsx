import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../hooks/useCart';

const mockProduct1 = { id: 1, name: '耳機', price: 1000 };
const mockProduct2 = { id: 2, name: '滑鼠', price: 500 };

describe('useCart Custom Hook', () => {
  it('Feature 2 & 3: should add items and calculate total quantity correctly', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1, 1);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.totalQuantity).toBe(1);
    expect(result.current.totalPrice).toBe(1000);
    expect(result.current.notifications.length).toBe(1);
  });

  it('Feature 5: should handle multi-step quantity updates correctly (+5, -1, etc.)', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1, 5); // Add 5 at once
    });

    expect(result.current.totalQuantity).toBe(5);

    act(() => {
      result.current.updateQuantity(mockProduct1.id, 5); // +5 step update
    });

    expect(result.current.totalQuantity).toBe(10);

    act(() => {
      result.current.updateQuantity(mockProduct1.id, -2); // -2 step update
    });

    expect(result.current.totalQuantity).toBe(8);
  });

  it('Feature 1: should remove items from shopping cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1, 1);
      result.current.addToCart(mockProduct2, 2);
    });

    expect(result.current.cart.length).toBe(2);

    act(() => {
      result.current.removeFromCart(mockProduct1.id);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].product.id).toBe(mockProduct2.id);
  });

  it('should clear cart on checkout completion', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1, 3);
      result.current.clearCart();
    });

    expect(result.current.cart.length).toBe(0);
    expect(result.current.totalQuantity).toBe(0);
  });
});
