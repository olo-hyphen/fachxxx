import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

/**
 * Context for managing application data (clients, orders, estimates).
 * @type {React.Context}
 */
const DataContext = createContext();

/**
 * Custom hook to access the data context.
 *
 * @returns {object} The data context value containing clients, orders, estimates and their CRUD operations.
 */
export const useData = () => useContext(DataContext);

/**
 * Provider component for the data context.
 * Manages state for clients, orders, and estimates, and handles persistence to localStorage.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to wrap.
 * @returns {JSX.Element} The provider component.
 */
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

  /**
   * Saves data to localStorage.
   *
   * @param {string} key - The localStorage key.
   * @param {any} data - The data to save.
   */
  const saveData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key}`, error);
      addToast(`Błąd zapisu danych: ${key}`, "error");
    }
  };

  // CRUD for Clients

  /**
   * Adds a new client.
   *
   * @param {object} client - The client object to add.
   */
  const addClient = (client) => {
    const newClient = { ...client, id: Date.now().toString() };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    saveData('clients', updatedClients);
    addToast("Dodano klienta");
  };

  /**
   * Updates an existing client.
   *
   * @param {string} id - The ID of the client to update.
   * @param {object} updatedData - The new data for the client.
   */
  const updateClient = (id, updatedData) => {
    const updatedClients = clients.map(c => c.id === id ? { ...c, ...updatedData } : c);
    setClients(updatedClients);
    saveData('clients', updatedClients);
    addToast("Zaktualizowano klienta");
  };

  /**
   * Deletes a client.
   *
   * @param {string} id - The ID of the client to delete.
   */
  const deleteClient = (id) => {
    const updatedClients = clients.filter(c => c.id !== id);
    setClients(updatedClients);
    saveData('clients', updatedClients);
    addToast("Usunięto klienta");
  };

  // CRUD for Orders

  /**
   * Adds a new order.
   *
   * @param {object} order - The order object to add.
   */
  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now().toString(), status: order.status || 'Nowe', createdAt: new Date().toISOString() };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    saveData('orders', updatedOrders);
    addToast("Dodano zlecenie");
  };

  /**
   * Updates an existing order.
   *
   * @param {string} id - The ID of the order to update.
   * @param {object} updatedData - The new data for the order.
   */
  const updateOrder = (id, updatedData) => {
    const updatedOrders = orders.map(o => o.id === id ? { ...o, ...updatedData } : o);
    setOrders(updatedOrders);
    saveData('orders', updatedOrders);
    addToast("Zaktualizowano zlecenie");
  };

  /**
   * Deletes an order.
   *
   * @param {string} id - The ID of the order to delete.
   */
    const deleteOrder = (id) => {
    const updatedOrders = orders.filter(o => o.id !== id);
    setOrders(updatedOrders);
    saveData('orders', updatedOrders);
    addToast("Usunięto zlecenie");
  };


  // CRUD for Estimates

  /**
   * Adds a new estimate.
   *
   * @param {object} estimate - The estimate object to add.
   */
  const addEstimate = (estimate) => {
    const newEstimate = { ...estimate, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updatedEstimates = [...estimates, newEstimate];
    setEstimates(updatedEstimates);
    saveData('estimates', updatedEstimates);
    addToast("Utworzono kosztorys");
  };

  /**
   * Deletes an estimate.
   *
   * @param {string} id - The ID of the estimate to delete.
   */
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
