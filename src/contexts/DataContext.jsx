import React, { createContext, useState, useEffect } from 'react';
import { createClient } from '../models/Client';

export const DataContext = createContext();

const initialData = {
  clients: [],
  orders: [],
  estimates: [],
  settings: {
    smsTemplate: 'Szanowny Kliencie, przypominamy o wizycie w dniu {data}.',
    emailTemplate: '<h1>Szanowny Kliencie,</h1><p>Przypominamy o wizycie w dniu {data}.</p>',
  },
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem('fachowiecProData');
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fachowiecProData', JSON.stringify(data));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [data]);

  const addClient = (clientData) => {
    const newClient = createClient(clientData);
    setData((prevData) => ({
      ...prevData,
      clients: [...prevData.clients, newClient],
    }));
  };

  const updateClient = (clientId, clientData) => {
    setData((prevData) => ({
      ...prevData,
      clients: prevData.clients.map((c) =>
        c.id === clientId ? { ...c, ...clientData } : c
      ),
    }));
  };

  const deleteClient = (clientId) => {
    setData((prevData) => ({
      ...prevData,
      clients: prevData.clients.filter((c) => c.id !== clientId),
    }));
  };


  return (
    <DataContext.Provider value={{ ...data, addClient, updateClient, deleteClient }}>
      {children}
    </DataContext.Provider>
  );
};
