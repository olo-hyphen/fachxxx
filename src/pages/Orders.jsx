import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Card } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { Plus, Search, Calendar, MapPin, Camera, Edit, Trash2 } from 'lucide-react';

export const Orders = () => {
  const { orders, clients, addOrder, updateOrder, deleteOrder } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const filteredOrders = orders.filter(order =>
    order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć to zlecenie?')) {
      deleteOrder(id);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const getStatusColor = (status) => {
      switch(status) {
          case 'Nowe': return 'bg-blue-100 text-blue-800';
          case 'W trakcie': return 'bg-yellow-100 text-yellow-800';
          case 'Zakończone': return 'bg-green-100 text-green-800';
          case 'Anulowane': return 'bg-red-100 text-red-800';
          default: return 'bg-gray-100 text-gray-800';
      }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Zlecenia</h1>
        <Button onClick={() => setIsFormOpen(true)} className="hidden-mobile">
            <Plus size={18} className="mr-2" /> Dodaj zlecenie
        </Button>
      </div>

      <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
          <Input
              placeholder="Szukaj zlecenia..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px' }}
          />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{order.title}</h3>
                  <p className="text-secondary text-sm">{order.clientName}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
              </div>

              <div className="flex flex-col gap-2 text-sm text-secondary mb-4">
                 {order.date && (
                     <div className="flex items-center gap-2">
                         <Calendar size={16} />
                         <span>{order.date}</span>
                     </div>
                 )}
                 {order.address && (
                     <div className="flex items-center gap-2">
                         <MapPin size={16} />
                         <span>{order.address}</span>
                     </div>
                 )}
                 {order.amount && (
                     <div className="flex items-center gap-2">
                        <span className="font-semibold">{parseFloat(order.amount).toFixed(2)} PLN</span>
                     </div>
                 )}
              </div>

              <div className="flex justify-between items-center border-t pt-3 border-gray-100">
                  <div className="flex gap-2">
                       <Button variant="secondary" className="text-xs px-2 py-1">
                           <Camera size={14} className="mr-1" /> Zdjęcia
                       </Button>
                  </div>
                  <div className="flex gap-1">
                      <IconButton icon={Edit} className="text-secondary hover:text-primary p-1" onClick={() => handleEdit(order)} />
                      <IconButton icon={Trash2} className="text-secondary hover:text-error p-1" onClick={() => handleDelete(order.id)} />
                  </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-secondary">
              <p>Brak zleceń. Dodaj pierwsze zlecenie.</p>
          </div>
        )}
      </div>

      <button className="fab hidden-desktop" onClick={() => setIsFormOpen(true)}>
        <Plus size={24} />
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingOrder ? 'Edytuj zlecenie' : 'Nowe zlecenie'}</h2>
            <OrderForm
                order={editingOrder}
                clients={clients}
                onSave={(data) => {
                    if (editingOrder) {
                        updateOrder(editingOrder.id, data);
                    } else {
                        addOrder(data);
                    }
                    closeForm();
                }}
                onCancel={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const OrderForm = ({ order, clients, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: order?.title || '',
        clientId: order?.clientId || '',
        status: order?.status || 'Nowe',
        date: order?.date || new Date().toISOString().split('T')[0],
        amount: order?.amount || '',
        address: order?.address || '',
        description: order?.description || '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleClientChange = (e) => {
        setFormData(prev => ({ ...prev, clientId: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedClient = clients.find(c => c.id === formData.clientId);
        onSave({
            ...formData,
            clientName: selectedClient ? selectedClient.name : 'Klient nieznany'
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input id="title" label="Tytuł zlecenia" value={formData.title} onChange={handleChange} required />

            <div className="input-group">
                <label htmlFor="clientId" className="input-label">Klient</label>
                <select
                    id="clientId"
                    className="input-field"
                    value={formData.clientId}
                    onChange={handleClientChange}
                    required
                >
                    <option value="">Wybierz klienta</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div>

            <div className="input-group">
                <label htmlFor="status" className="input-label">Status</label>
                <select
                    id="status"
                    className="input-field"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Nowe">Nowe</option>
                    <option value="W trakcie">W trakcie</option>
                    <option value="Zakończone">Zakończone</option>
                    <option value="Anulowane">Anulowane</option>
                </select>
            </div>

            <Input id="date" label="Data" type="date" value={formData.date} onChange={handleChange} />
            <Input id="amount" label="Kwota (PLN)" type="number" step="0.01" value={formData.amount} onChange={handleChange} />
            <Input id="address" label="Adres" value={formData.address} onChange={handleChange} />
            <TextArea id="description" label="Opis" value={formData.description} onChange={handleChange} />

            <div className="flex gap-3 mt-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>Anuluj</Button>
                <Button type="submit" className="flex-1">Zapisz</Button>
            </div>
        </form>
    );
};
