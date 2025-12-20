import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import { ToastContext } from '../contexts/ToastContext';
import ClientForm from '../components/ClientForm';

function AddClient() {
  const { addClient } = useContext(DataContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = (clientData) => {
    addClient(clientData);
    addToast('Klient został dodany.', 'success');
    navigate('/clients');
  };

  return (
    <div>
      <h2>Dodaj klienta</h2>
      <ClientForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddClient;
