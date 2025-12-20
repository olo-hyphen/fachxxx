export const calculateMonthlyRevenue = (estimates) => {
  const months = [];
  const today = new Date();

  // Generate last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = d.toLocaleString('pl-PL', { month: 'short' });
    // Capitalize first letter (e.g., "sty" -> "Sty")
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    months.push({
      name: capitalizedMonth,
      monthIndex: d.getMonth(),
      year: d.getFullYear(),
      amount: 0
    });
  }

  if (!estimates || estimates.length === 0) {
    return months.map(({ name, amount }) => ({ name, amount }));
  }

  estimates.forEach(estimate => {
    if (!estimate.createdAt) return;

    const estDate = new Date(estimate.createdAt);
    const estMonth = estDate.getMonth();
    const estYear = estDate.getFullYear();
    const estTotal = parseFloat(estimate.total) || 0;

    const monthEntry = months.find(m => m.monthIndex === estMonth && m.year === estYear);
    if (monthEntry) {
      monthEntry.amount += estTotal;
    }
  });

  return months.map(({ name, amount }) => ({ name, amount }));
};

export const calculateCurrentMonthRevenue = (estimates) => {
  if (!estimates || estimates.length === 0) return "0 PLN";

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const total = estimates.reduce((acc, estimate) => {
    if (!estimate.createdAt) return acc;

    const estDate = new Date(estimate.createdAt);
    if (estDate.getMonth() === currentMonth && estDate.getFullYear() === currentYear) {
      return acc + (parseFloat(estimate.total) || 0);
    }
    return acc;
  }, 0);

  // Format as currency string e.g. "12 450 PLN"
  return total.toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " PLN";
};

export const calculateOrderStatus = (orders) => {
  if (!orders || orders.length === 0) {
    return [];
  }

  const counts = orders.reduce((acc, order) => {
    const status = order.status || 'Nowe';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
};
