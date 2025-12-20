import React, { createContext, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Toast.css';

export const ToastContext = createContext();

let id = 1;

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`toast toast--${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return ReactDOM.createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const newToast = { id: id++, message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};
