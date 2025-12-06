// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { DataProvider, useData } from './DataContext';
import { ToastProvider } from './ToastContext';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock ToastContext to avoid needing its full implementation
vi.mock('./ToastContext', () => ({
  useToast: () => ({ addToast: vi.fn() }),
  ToastProvider: ({ children }) => <div>{children}</div>
}));

describe('DataContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('updates client name in orders when client is updated', async () => {
    const wrapper = ({ children }) => (
      <ToastProvider>
        <DataProvider>{children}</DataProvider>
      </ToastProvider>
    );

    const { result } = renderHook(() => useData(), { wrapper });

    // 1. Create a client
    let clientId;
    await act(async () => {
      result.current.addClient({ name: 'Old Name', email: 'test@example.com' });
    });

    // Wait for state update (though act should handle it)
    clientId = result.current.clients[0].id;
    expect(result.current.clients[0].name).toBe('Old Name');

    // 2. Create an order for that client
    await act(async () => {
      result.current.addOrder({
        title: 'Test Order',
        clientId: clientId,
        clientName: 'Old Name' // As it is done in the UI
      });
    });

     // 3. Create an estimate for that client
    await act(async () => {
      result.current.addEstimate({
        title: 'Test Estimate',
        clientId: clientId,
        clientName: 'Old Name', // As it is done in the UI
        items: [],
        total: 0
      });
    });

    expect(result.current.orders[0].clientName).toBe('Old Name');
    expect(result.current.estimates[0].clientName).toBe('Old Name');

    // 4. Update the client
    await act(async () => {
      result.current.updateClient(clientId, { name: 'New Name' });
    });

    // 5. Verify client is updated
    expect(result.current.clients[0].name).toBe('New Name');

    // 6. Verify order is updated
    expect(result.current.orders[0].clientName).toBe('New Name');

    // 7. Verify estimate is updated
    expect(result.current.estimates[0].clientName).toBe('New Name');
  });
});
