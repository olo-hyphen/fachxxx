import React from 'react';

/**
 * A standard input field component with label and error handling.
 *
 * @param {object} props - Component props.
 * @param {string} [props.label] - The text label for the input.
 * @param {string} [props.id] - The ID attribute for the input element.
 * @param {string} [props.error] - An error message to display below the input.
 * @param {string} [props.className] - Additional CSS classes to apply to the input container.
 * @param {...object} props.props - Additional props passed to the underlying input element.
 * @returns {JSX.Element} The rendered input component.
 */
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

/**
 * A textarea component with label and error handling.
 *
 * @param {object} props - Component props.
 * @param {string} [props.label] - The text label for the textarea.
 * @param {string} [props.id] - The ID attribute for the textarea element.
 * @param {string} [props.error] - An error message to display below the textarea.
 * @param {string} [props.className] - Additional CSS classes to apply to the textarea container.
 * @param {...object} props.props - Additional props passed to the underlying textarea element.
 * @returns {JSX.Element} The rendered textarea component.
 */
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
