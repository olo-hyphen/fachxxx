import { describe, it, expect } from 'vitest';
import { calculateMonthlyRevenue } from './revenue';

describe('calculateMonthlyRevenue', () => {
  const currentYear = 2024;

  it('should return 0 for all months if no orders are provided', () => {
    const result = calculateMonthlyRevenue([], currentYear);
    result.forEach(month => {
      expect(month.amount).toBe(0);
    });
    expect(result.length).toBe(12);
  });

  it('should sum amounts for completed orders in the current year', () => {
    const orders = [
      { status: 'Zakończone', date: '2024-01-15', amount: 1000 },
      { status: 'Zakończone', date: '2024-01-20', amount: 500 },
      { status: 'Zakończone', date: '2024-03-10', amount: 2000 },
    ];

    const result = calculateMonthlyRevenue(orders, currentYear);

    expect(result[0].name).toBe('Styczeń');
    expect(result[0].amount).toBe(1500);
    expect(result[2].name).toBe('Marzec');
    expect(result[2].amount).toBe(2000);
  });

  it('should ignore non-completed orders', () => {
    const orders = [
      { status: 'Nowe', date: '2024-01-15', amount: 1000 },
      { status: 'W trakcie', date: '2024-01-20', amount: 500 },
      { status: 'Zakończone', date: '2024-01-25', amount: 200 },
    ];

    const result = calculateMonthlyRevenue(orders, currentYear);

    expect(result[0].amount).toBe(200);
  });

  it('should ignore orders from other years', () => {
    const orders = [
      { status: 'Zakończone', date: '2023-12-31', amount: 1000 },
      { status: 'Zakończone', date: '2024-01-01', amount: 500 },
    ];

    const result = calculateMonthlyRevenue(orders, currentYear);

    expect(result[0].amount).toBe(500);
  });

  it('should handle missing or invalid amounts', () => {
    const orders = [
      { status: 'Zakończone', date: '2024-01-01', amount: '100' }, // String
      { status: 'Zakończone', date: '2024-01-02', amount: null },
      { status: 'Zakończone', date: '2024-01-03' }, // undefined
    ];

    const result = calculateMonthlyRevenue(orders, currentYear);

    expect(result[0].amount).toBe(100);
  });
});
