import React from 'react';
import { useData } from '../contexts/DataContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, FileSpreadsheet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Reports component displaying charts and export options.
 * Shows revenue analysis and allows exporting data to CSV.
 *
 * @returns {JSX.Element} The rendered reports page.
 */
export const Reports = () => {
  const { clients, orders, estimates } = useData();

  // Calculate monthly revenue from completed orders and estimates (simplified)
  // In a real app, this would use order dates and amounts.
  // Here we mock the data aggregation or use available mocked data.
  const revenueData = [
    { name: 'Styczeń', amount: 4000 },
    { name: 'Luty', amount: 3000 },
    { name: 'Marzec', amount: 2000 },
    { name: 'Kwiecień', amount: 2780 },
    { name: 'Maj', amount: 1890 },
    { name: 'Czerwiec', amount: 2390 },
    { name: 'Lipiec', amount: 3490 },
  ];

  /**
   * Exports an array of objects to a CSV file.
   *
   * @param {Array<object>} data - The data to export.
   * @param {string} filename - The name of the file to save (without extension).
   */
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
        alert("Brak danych do eksportu");
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Raporty i Analizy</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Przychody roczne">
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

        <div className="flex flex-col gap-4">
            <Card title="Eksport Danych">
                <div className="flex flex-col gap-3">
                    <p className="text-secondary text-sm">Pobierz dane zgromadzone w aplikacji do formatu CSV.</p>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="text-green-600" />
                            <div>
                                <p className="font-medium">Baza Klientów</p>
                                <p className="text-xs text-secondary">{clients.length} rekordów</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="text-sm" onClick={() => exportToCSV(clients, 'klienci')}>
                            <Download size={16} className="mr-2" /> Pobierz
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="text-blue-600" />
                            <div>
                                <p className="font-medium">Rejestr Zleceń</p>
                                <p className="text-xs text-secondary">{orders.length} rekordów</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="text-sm" onClick={() => exportToCSV(orders, 'zlecenia')}>
                            <Download size={16} className="mr-2" /> Pobierz
                        </Button>
                    </div>

                     <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                            <FileSpreadsheet className="text-orange-600" />
                            <div>
                                <p className="font-medium">Rejestr Kosztorysów</p>
                                <p className="text-xs text-secondary">{estimates.length} rekordów</p>
                            </div>
                        </div>
                        <Button variant="secondary" className="text-sm" onClick={() => exportToCSV(estimates, 'kosztorysy')}>
                            <Download size={16} className="mr-2" /> Pobierz
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};
