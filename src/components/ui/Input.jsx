import React from 'react';

export const Input = ({ label, id, error, className, ...props }) => {
  return (
    <div className={`input-group ${className || ''}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        id={id}
        className="input-field"
        {...props}
      />
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
};

export const TextArea = ({ label, id, error, className, ...props }) => {
    return (
      <div className={`input-group ${className || ''}`}>
        {label && <label htmlFor={id} className="input-label">{label}</label>}
        <textarea
          id={id}
          className="input-field"
          style={{ minHeight: '100px', resize: 'vertical' }}
          {...props}
        />
        {error && <span className="text-error text-sm">{error}</span>}
      </div>
    );
  };
