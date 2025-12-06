import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    // Load data from local storage
    const loadData = () => {
      try {
        const storedClients = localStorage.getItem('clients');
        const storedOrders = localStorage.getItem('orders');
        const storedEstimates = localStorage.getItem('estimates');

        if (storedClients) setClients(JSON.parse(storedClients));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
        if (storedEstimates) setEstimates(JSON.parse(storedEstimates));
      } catch (error) {
        console.error("Failed to load data", error);
        addToast("Błąd wczytywania danych", "error");
      }
    };
    loadData();
  }, []);

  const saveData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
      addToast(`Błąd zapisu danych: ${key}`, "error");
    }
  };

  // CRUD for Clients
  const addClient = (client) => {
    const newClient = { ...client, id: Date.now().toString() };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    saveData('clients', updatedClients);
    addToast("Dodano klienta");
  };

  const updateClient = (id, updatedData) => {
    const updatedClients = clients.map(c => c.id === id ? { ...c, ...updatedData } : c);
    setClients(updatedClients);
    saveData('clients', updatedClients);

    // Update client name in orders
    if (updatedData.name !== undefined) {
      const updatedOrders = orders.map(o =>
        o.clientId === id ? { ...o, clientName: updatedData.name } : o
      );
      if (JSON.stringify(updatedOrders) !== JSON.stringify(orders)) {
        setOrders(updatedOrders);
        saveData('orders', updatedOrders);
      }

      // Update client name in estimates
      const updatedEstimates = estimates.map(e =>
        e.clientId === id ? { ...e, clientName: updatedData.name } : e
      );
      if (JSON.stringify(updatedEstimates) !== JSON.stringify(estimates)) {
        setEstimates(updatedEstimates);
        saveData('estimates', updatedEstimates);
      }
    }

    addToast("Zaktualizowano klienta");
  };

  const deleteClient = (id) => {
    const updatedClients = clients.filter(c => c.id !== id);
    setClients(updatedClients);
    saveData('clients', updatedClients);
    addToast("Usunięto klienta");
  };

  // CRUD for Orders
  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now().toString(), status: order.status || 'Nowe', createdAt: new Date().toISOString() };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    saveData('orders', updatedOrders);
    addToast("Dodano zlecenie");
  };

  const updateOrder = (id, updatedData) => {
    const updatedOrders = orders.map(o => o.id === id ? { ...o, ...updatedData } : o);
    setOrders(updatedOrders);
    saveData('orders', updatedOrders);
    addToast("Zaktualizowano zlecenie");
  };

    const deleteOrder = (id) => {
    const updatedOrders = orders.filter(o => o.id !== id);
    setOrders(updatedOrders);
    saveData('orders', updatedOrders);
    addToast("Usunięto zlecenie");
  };


  // CRUD for Estimates
  const addEstimate = (estimate) => {
    const newEstimate = { ...estimate, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updatedEstimates = [...estimates, newEstimate];
    setEstimates(updatedEstimates);
    saveData('estimates', updatedEstimates);
    addToast("Utworzono kosztorys");
  };

  const deleteEstimate = (id) => {
      const updatedEstimates = estimates.filter(e => e.id !== id);
      setEstimates(updatedEstimates);
      saveData('estimates', updatedEstimates);
      addToast("Usunięto kosztorys");
  }

  return (
    <DataContext.Provider value={{
      clients, addClient, updateClient, deleteClient,
      orders, addOrder, updateOrder, deleteOrder,
      estimates, addEstimate, deleteEstimate
    }}>
      {children}
    </DataContext.Provider>
  );
};
