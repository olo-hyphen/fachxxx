import React, { useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { Card } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, ClipboardList, DollarSign } from 'lucide-react';
import { calculateMonthlyRevenue, calculateCurrentMonthRevenue, calculateOrderStatus } from '../utils/dashboardHelpers';

export const Dashboard = () => {
  const { clients, orders, estimates } = useData();

  const revenueData = useMemo(() => calculateMonthlyRevenue(estimates), [estimates]);
  const orderStatusData = useMemo(() => calculateOrderStatus(orders), [orders]);
  const currentMonthRevenue = useMemo(() => calculateCurrentMonthRevenue(estimates), [estimates]);

  const COLORS = ['#0A2463', '#3DDC97', '#0088FE', '#E53E3E'];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card flex items-center p-4">
      <div className={`p-3 rounded-full mr-4 bg-opacity-20`} style={{ backgroundColor: `${color}20` }}>
        <Icon size={24} style={{ color: color }} />
      </div>
      <div>
        <p className="text-secondary text-sm">{title}</p>
        <h4 className="text-xl font-bold">{value}</h4>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Pulpit</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <StatCard title="Klienci" value={clients.length} icon={Users} color="#0A2463" />
        <StatCard title="Aktywne zlecenia" value={orders.filter(o => o.status !== 'Zakończone').length} icon={ClipboardList} color="#3DDC97" />
        <StatCard title="Przychód (Msc)" value={currentMonthRevenue} icon={DollarSign} color="#10B981" />
        <StatCard title="Kosztorysy" value={estimates.length} icon={TrendingUp} color="#F59E0B" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        <Card title="Przychody (Ostatnie 6 msc)">
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Status Zleceń">
          <div style={{ height: 300 }}>
             {orderStatusData.length > 0 ? (
               <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                    {orderStatusData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                            <div style={{ width: 12, height: 12, backgroundColor: COLORS[index % COLORS.length], borderRadius: '50%' }}></div>
                            <span className="text-sm text-secondary">{entry.name}</span>
                        </div>
                    ))}
                </div>
               </>
             ) : (
                <div className="flex items-center justify-center h-full text-secondary">
                    Brak danych o zleceniach
                </div>
             )}
          </div>
        </Card>
      </div>

      <Card title="Ostatnia aktywność">
         {orders.length === 0 ? (
             <p className="text-secondary text-center py-4">Brak ostatniej aktywności</p>
         ) : (
            <div className="flex flex-col gap-4">
                {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                        <div>
                            <p className="font-medium">{order.title}</p>
                            <p className="text-xs text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'Nowe' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Zakończone' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {order.status}
                        </span>
                    </div>
                ))}
            </div>
         )}
      </Card>
    </div>
  );
};
