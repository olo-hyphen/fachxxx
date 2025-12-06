import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Card } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Search, FileText, Trash2, Download, Minus } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useAuth } from '../contexts/AuthContext';

/**
 * Component for managing estimates (price quotes).
 * Allows creating, viewing, deleting, and downloading estimates as PDF.
 *
 * @returns {JSX.Element} The rendered estimates page.
 */
export const Estimates = () => {
  const { estimates, clients, addEstimate, deleteEstimate } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();

  const filteredEstimates = estimates.filter(est =>
    est.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten kosztorys?')) {
      deleteEstimate(id);
    }
  };

  const generatePDF = (estimate) => {
    const doc = new jsPDF();

    // Add font (standard font is used here for simplicity, custom fonts need base64)
    doc.setFont("helvetica");

    // Header
    doc.setFontSize(20);
    doc.text("KOSZTORYS", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Numer: ${estimate.id.slice(-6)}`, 14, 30);
    doc.text(`Data: ${new Date(estimate.createdAt).toLocaleDateString()}`, 14, 36);

    // Client Info
    doc.setFontSize(14);
    doc.text("Dla:", 14, 50);
    doc.setFontSize(12);
    doc.text(estimate.clientName, 14, 58);

    // Provider Info (Mock)
    doc.setFontSize(14);
    doc.text("Wystawca:", 120, 50);
    doc.setFontSize(12);
    doc.text(user?.name || "Moja Firma", 120, 58);
    doc.text(user?.email || "kontakt@firma.pl", 120, 64);

    // Items Table
    const tableColumn = ["Opis", "Ilosc", "Cena jedn.", "Wartosc"];
    const tableRows = [];

    estimate.items.forEach(item => {
      const itemData = [
        item.description,
        item.quantity.toString(),
        `${parseFloat(item.price).toFixed(2)} PLN`,
        `${(item.quantity * item.price).toFixed(2)} PLN`,
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 75,
    });

    // Total
    const finalY = doc.lastAutoTable.finalY || 75;
    doc.setFontSize(14);
    doc.text(`Suma calkowita: ${estimate.total.toFixed(2)} PLN`, 140, finalY + 20, { align: "right" });

    doc.save(`kosztorys_${estimate.id}.pdf`);
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Kosztorysy</h1>
        <Button onClick={() => setIsFormOpen(true)} className="hidden-mobile">
            <Plus size={18} className="mr-2" /> Nowy kosztorys
        </Button>
      </div>

      <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
          <Input
              placeholder="Szukaj kosztorysu..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
          />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredEstimates.length > 0 ? (
          filteredEstimates.map(est => (
            <Card key={est.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{est.title}</h3>
                  <p className="text-secondary text-sm">{est.clientName} • {new Date(est.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-bold text-lg text-primary">
                    {est.total.toFixed(2)} PLN
                </span>
              </div>

              <div className="flex justify-end gap-2 border-t pt-3 border-gray-100 mt-2">
                  <Button variant="secondary" className="text-xs px-2 py-1" onClick={() => generatePDF(est)}>
                       <Download size={14} className="mr-1" /> PDF
                  </Button>
                  <IconButton icon={Trash2} className="text-secondary hover:text-error p-1" onClick={() => handleDelete(est.id)} />
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-secondary">
              <p>Brak kosztorysów. Utwórz pierwszy kosztorys.</p>
          </div>
        )}
      </div>

      <button className="fab hidden-desktop" onClick={() => setIsFormOpen(true)}>
        <Plus size={24} />
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Nowy kosztorys</h2>
            <EstimateForm
                clients={clients}
                onSave={(data) => {
                    addEstimate(data);
                    setIsFormOpen(false);
                }}
                onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Form component for creating a new estimate.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.clients - List of available clients.
 * @param {function} props.onSave - Callback function when the form is submitted.
 * @param {function} props.onCancel - Callback function when the form is cancelled.
 * @returns {JSX.Element} The rendered estimate form.
 */
const EstimateForm = ({ clients, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [clientId, setClientId] = useState('');
    const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);

    const addItem = () => {
        setItems([...items, { description: '', quantity: 1, price: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedClient = clients.find(c => c.id === clientId);
        onSave({
            title,
            clientId,
            clientName: selectedClient ? selectedClient.name : 'Klient nieznany',
            items,
            total: calculateTotal()
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input id="title" label="Tytuł / Nazwa kosztorysu" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <div className="input-group">
                <label htmlFor="clientId" className="input-label">Klient</label>
                <select
                    id="clientId"
                    className="input-field"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    required
                >
                    <option value="">Wybierz klienta</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="input-label">Pozycje kosztorysu</label>
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start bg-gray-50 p-2 rounded">
                        <div className="flex-grow">
                             <Input
                                placeholder="Opis usługi/materiału"
                                value={item.description}
                                onChange={(e) => updateItem(index, 'description', e.target.value)}
                                className="mb-2"
                                required
                             />
                             <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Ilość"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                                    min="0"
                                />
                                <Input
                                    type="number"
                                    placeholder="Cena (PLN)"
                                    value={item.price}
                                    onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                                    min="0"
                                    step="0.01"
                                />
                             </div>
                        </div>
                        <IconButton
                            icon={Trash2}
                            type="button"
                            className="text-error mt-1"
                            onClick={() => removeItem(index)}
                            disabled={items.length === 1}
                        />
                    </div>
                ))}
                <Button type="button" variant="secondary" onClick={addItem} className="mt-2 text-sm">
                    <Plus size={16} className="mr-1" /> Dodaj pozycję
                </Button>
            </div>

            <div className="flex justify-end mt-2">
                <h3 className="text-xl font-bold">Suma: {calculateTotal().toFixed(2)} PLN</h3>
            </div>

            <div className="flex gap-3 mt-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>Anuluj</Button>
                <Button type="submit" className="flex-1">Utwórz kosztorys</Button>
            </div>
        </form>
    );
};
