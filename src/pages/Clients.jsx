import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';

function Clients() {
  const { clients } = useContext(DataContext);

  return (
    <div>
      <h2>Klienci</h2>
      <Link to="/clients/new">Dodaj klienta</Link>
      {clients.length === 0 ? (
        <p>Brak klientów.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <Link to={`/clients/${client.id}`}>{client.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Clients;
