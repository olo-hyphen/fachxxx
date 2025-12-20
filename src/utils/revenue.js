export const calculateMonthlyRevenue = (orders, year) => {
  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  const revenueByMonth = monthNames.map(name => ({ name, amount: 0 }));

  if (!orders || !Array.isArray(orders)) {
    return revenueByMonth;
  }

  orders.forEach(order => {
    if (order.status !== 'Zakończone') {
      return;
    }

    const orderDate = new Date(order.date);
    if (isNaN(orderDate.getTime())) {
      return;
    }

    if (orderDate.getFullYear() === year) {
      const monthIndex = orderDate.getMonth();
      const amount = parseFloat(order.amount) || 0;
      revenueByMonth[monthIndex].amount += amount;
    }
  });

  return revenueByMonth;
};
