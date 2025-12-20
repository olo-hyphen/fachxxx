import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, variant = 'primary', className, icon: Icon, ...props }) => {
  return (
    <button
      className={clsx('btn', `btn-${variant}`, className)}
      {...props}
    >
      {Icon && <Icon size={18} style={{ marginRight: children ? 8 : 0 }} />}
      {children}
    </button>
  );
};

export const IconButton = ({ icon: Icon, className, title, ...props }) => {
  const ariaLabel = props['aria-label'];
  const effectiveTitle = title || ariaLabel;

  return (
    <button
      className={clsx('btn-icon', className)}
      title={effectiveTitle}
      {...props}
    >
      {Icon && <Icon size={24} />}
    </button>
  );
}
