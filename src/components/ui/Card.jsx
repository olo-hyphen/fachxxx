import React from 'react';
import clsx from 'clsx';

/**
 * A generic card container component.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className] - Additional CSS classes to apply to the card container.
 * @param {string} [props.title] - An optional title for the card header.
 * @param {React.ReactNode} [props.action] - An optional action element (e.g., a button) to be displayed in the card header.
 * @returns {JSX.Element} The rendered card component.
 */
export const Card = ({ children, className, title, action }) => {
  return (
    <div className={clsx('card', className)}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
