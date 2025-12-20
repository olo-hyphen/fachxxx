import { describe, it, expect } from 'vitest';
import { calculateMonthlyRevenue, calculateCurrentMonthRevenue, calculateOrderStatus } from './dashboardHelpers';

describe('dashboardHelpers', () => {
  describe('calculateMonthlyRevenue', () => {
    it('should return 6 months of data even with empty estimates', () => {
      const result = calculateMonthlyRevenue([]);
      expect(result).toHaveLength(6);
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('amount', 0);
    });

    it('should aggregate revenue correctly by month', () => {
      const today = new Date();
      const currentMonthIndex = today.getMonth();
      const currentYear = today.getFullYear();

      const estimates = [
        {
          createdAt: new Date(currentYear, currentMonthIndex, 1).toISOString(),
          total: 1000
        },
        {
            createdAt: new Date(currentYear, currentMonthIndex, 15).toISOString(),
            total: 500
        },
        {
            createdAt: new Date(currentYear, currentMonthIndex - 1, 1).toISOString(),
            total: 2000
        }
      ];

      const result = calculateMonthlyRevenue(estimates);
      const lastMonth = result[5]; // Current month
      const prevMonth = result[4]; // Previous month

      expect(lastMonth.amount).toBe(1500);
      expect(prevMonth.amount).toBe(2000);
    });
  });

  describe('calculateCurrentMonthRevenue', () => {
      it('should return "0 PLN" for empty estimates', () => {
          expect(calculateCurrentMonthRevenue([])).toBe("0 PLN");
      });

      it('should calculate revenue for current month only', () => {
          const today = new Date();
          const currentMonthIndex = today.getMonth();
          const currentYear = today.getFullYear();

          // Make sure we handle "last year" correctly if current month is January
          const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
          const prevMonthYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;

          const estimates = [
            {
              createdAt: new Date(currentYear, currentMonthIndex, 5).toISOString(),
              total: 1000
            },
            {
                createdAt: new Date(prevMonthYear, prevMonthIndex, 1).toISOString(),
                total: 5000 // Should not be counted
            }
          ];

          // Note: using non-breaking space might be an issue with toLocaleString depending on locale,
          // but we used standard space in implementation?
          // Actually implementation uses toLocaleString which might insert non-breaking space for thousands separator.
          // Let's check loosely or handle the format.
          // pl-PL locale often uses non-breaking space for thousands. 1000 -> "1 000" or "1000" depending on implementation.
          // For < 10000 often no space.

          const result = calculateCurrentMonthRevenue(estimates);
          // Expect "1 000 PLN" or "1000 PLN" depending on locale.
          // Since it failed expecting "1 000" but got "1000", we should adjust expectation or helper.
          // Given the environment, it seems it formats as "1000".
          // We will normalize by removing all spaces to check value.
          expect(result.replace(/\s/g, '')).toBe("1000PLN");
      });
  });

  describe('calculateOrderStatus', () => {
      it('should return empty array for no orders', () => {
          expect(calculateOrderStatus([])).toEqual([]);
      });

      it('should count statuses correctly', () => {
          const orders = [
              { status: 'Nowe' },
              { status: 'Nowe' },
              { status: 'Zakończone' },
              { status: 'W trakcie' }
          ];

          const result = calculateOrderStatus(orders);

          const nowe = result.find(r => r.name === 'Nowe');
          const zakonczone = result.find(r => r.name === 'Zakończone');
          const wtrakcie = result.find(r => r.name === 'W trakcie');

          expect(nowe.value).toBe(2);
          expect(zakonczone.value).toBe(1);
          expect(wtrakcie.value).toBe(1);
      });
  });
});
