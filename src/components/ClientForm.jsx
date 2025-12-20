import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientForm({ client, onSubmit }) {
  const [name, setName] = useState(client?.name || '');
  const [phone, setPhone] = useState(client?.phone || '');
  const [email, setEmail] = useState(client?.email || '');
  const [address, setAddress] = useState(client?.address || '');
  const [nip, setNip] = useState(client?.nip || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError('Nazwa jest wymagana.');
      return;
    }
    onSubmit({ name, phone, email, address, nip });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="name">Nazwa</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Telefon</label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Adres</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="nip">NIP</label>
        <input
          id="nip"
          type="text"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
        />
      </div>
      <button type="submit">Zapisz</button>
      <button type="button" onClick={() => navigate('/clients')}>
        Anuluj
      </button>
    </form>
  );
}

export default ClientForm;
