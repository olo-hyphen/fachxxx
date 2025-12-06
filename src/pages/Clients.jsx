import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Card } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Search, Phone, Mail, MessageSquare, Edit, Trash2 } from 'lucide-react';

/**
 * Component for managing clients.
 * Allows searching, adding, editing, and deleting clients.
 *
 * @returns {JSX.Element} The rendered clients page.
 */
export const Clients = () => {
  const { clients, addClient, updateClient, deleteClient } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.includes(searchTerm)
  );

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć tego klienta?')) {
      deleteClient(id);
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Klienci</h1>
        <Button onClick={() => setIsFormOpen(true)} className="hidden-mobile">
            <Plus size={18} className="mr-2" /> Dodaj klienta
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={18} />
            <Input
                placeholder="Szukaj klienta..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '36px' }}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <Card key={client.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{client.name}</h3>
                  <p className="text-secondary text-sm">{client.company}</p>
                </div>
                <div className="flex gap-1">
                    <IconButton icon={Edit} className="text-secondary hover:text-primary" onClick={() => handleEdit(client)} />
                    <IconButton icon={Trash2} className="text-secondary hover:text-error" onClick={() => handleDelete(client.id)} />
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                 {client.phone && (
                     <div className="flex items-center gap-2 text-sm">
                         <Phone size={16} className="text-secondary" />
                         <a href={`tel:${client.phone}`}>{client.phone}</a>
                     </div>
                 )}
                 {client.email && (
                     <div className="flex items-center gap-2 text-sm">
                         <Mail size={16} className="text-secondary" />
                         <a href={`mailto:${client.email}`}>{client.email}</a>
                     </div>
                 )}
              </div>

              <div className="mt-4 flex gap-2 border-t pt-3 border-gray-100">
                <Button variant="secondary" className="flex-1 text-xs py-1" onClick={() => window.open(`tel:${client.phone}`)}>
                    <Phone size={14} className="mr-1" /> Zadzwoń
                </Button>
                <Button variant="secondary" className="flex-1 text-xs py-1" onClick={() => window.open(`sms:${client.phone}`)}>
                    <MessageSquare size={14} className="mr-1" /> SMS
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-secondary">
              <p>Brak klientów. Dodaj pierwszego klienta.</p>
          </div>
        )}
      </div>

      {/* FAB for mobile */}
      <button className="fab hidden-desktop" onClick={() => setIsFormOpen(true)}>
        <Plus size={24} />
      </button>

      {/* Client Form Modal (Simple implementation) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingClient ? 'Edytuj klienta' : 'Nowy klient'}</h2>
            <ClientForm
                client={editingClient}
                onSave={(data) => {
                    if (editingClient) {
                        updateClient(editingClient.id, data);
                    } else {
                        addClient(data);
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

/**
 * Form component for creating or editing a client.
 *
 * @param {object} props - Component props.
 * @param {object} [props.client] - The client object to edit (if any).
 * @param {function} props.onSave - Callback function when the form is submitted.
 * @param {function} props.onCancel - Callback function when the form is cancelled.
 * @returns {JSX.Element} The rendered client form.
 */
const ClientForm = ({ client, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: client?.name || '',
        company: client?.company || '',
        phone: client?.phone || '',
        email: client?.email || '',
        address: client?.address || '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input id="name" label="Imię i Nazwisko / Nazwa" value={formData.name} onChange={handleChange} required />
            <Input id="company" label="Firma (opcjonalnie)" value={formData.company} onChange={handleChange} />
            <Input id="phone" label="Telefon" type="tel" value={formData.phone} onChange={handleChange} required />
            <Input id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            <Input id="address" label="Adres" value={formData.address} onChange={handleChange} />

            <div className="flex gap-3 mt-4">
                <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>Anuluj</Button>
                <Button type="submit" className="flex-1">Zapisz</Button>
            </div>
        </form>
    );
};
