import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import { ToastContext } from '../contexts/ToastContext';

function ClientDetails() {
  const { clientId } = useParams();
  const { clients, deleteClient } = useContext(DataContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return <p>Nie znaleziono klienta.</p>;
  }

  const handleDelete = () => {
    if (window.confirm('Czy na pewno chcesz usunąć tego klienta?')) {
      deleteClient(client.id);
      addToast('Klient został usunięty.', 'success');
      navigate('/clients');
    }
  };

  return (
    <div>
      <h2>{client.name}</h2>
      <p>
        <strong>Telefon:</strong> {client.phone || '-'}
      </p>
      <p>
        <strong>Email:</strong> {client.email || '-'}
      </p>
      <p>
        <strong>Adres:</strong> {client.address || '-'}
      </p>
      <p>
        <strong>NIP:</strong> {client.nip || '-'}
      </p>
      <Link to={`/clients/${client.id}/edit`}>Edytuj</Link>
      <button onClick={handleDelete}>Usuń</button>
    </div>
  );
}

export default ClientDetails;
