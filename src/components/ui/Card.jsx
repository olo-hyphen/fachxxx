import React from 'react';
import clsx from 'clsx';

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
