import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import { ToastContext } from '../contexts/ToastContext';
import ClientForm from '../components/ClientForm';

function EditClient() {
  const { clientId } = useParams();
  const { clients, updateClient } = useContext(DataContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return <p>Nie znaleziono klienta.</p>;
  }

  const handleSubmit = (clientData) => {
    updateClient(clientId, clientData);
    addToast('Dane klienta zostały zaktualizowane.', 'success');
    navigate('/clients');
  };

  return (
    <div>
      <h2>Edytuj klienta</h2>
      <ClientForm client={client} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditClient;
