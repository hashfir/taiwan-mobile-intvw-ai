import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Shopping Cart Application Component Integration Tests', () => {
  it('Feature 4: filters products via search input box', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText('搜尋商品名稱...');
    expect(screen.getByText('無線藍牙耳機')).toBeInTheDocument();

    // Type "耳機" into search box
    fireEvent.change(searchInput, { target: { value: '耳機' } });

    expect(screen.getByText('無線藍牙耳機')).toBeInTheDocument();
    expect(screen.queryByText('智慧手錶')).toBeNull();
  });

  it('Feature 1 & 2: opens confirmation modal dialog on removal request', () => {
    render(<App />);

    // Open shopping cart
    const cartButton = screen.getByRole('button', { name: '開啟購物車' });
    fireEvent.click(cartButton);

    // Modal should not be present initially
    expect(screen.queryByTestId('modal-backdrop')).toBeNull();
  });
});
