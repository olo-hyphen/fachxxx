import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Context for managing toast notifications.
 * @type {React.Context}
 */
const ToastContext = createContext();

/**
 * Custom hook to access the toast context.
 *
 * @returns {object} The toast context value.
 * @returns {function} return.addToast - Function to add a new toast notification.
 */
export const useToast = () => useContext(ToastContext);

/**
 * Provider component for the toast context.
 * Manages the list of active toasts and renders the toast container.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to wrap.
 * @returns {JSX.Element} The provider component.
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Removes a toast notification by ID.
   *
   * @param {number} id - The ID of the toast to remove.
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Adds a new toast notification.
   *
   * @param {string} message - The message to display.
   * @param {string} [type='info'] - The type of toast ('info', 'error', etc.).
   */
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none'
      }}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{
            background: toast.type === 'error' ? 'var(--error)' : 'var(--text-primary)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            fontSize: '14px',
            pointerEvents: 'auto'
          }}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
