import React from 'react';
import clsx from 'clsx';

/**
 * A versatile button component that supports different variants and an optional icon.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.variant='primary'] - The visual style of the button (e.g., 'primary', 'secondary', 'danger').
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {React.ElementType} [props.icon] - An optional icon component to render before the text.
 * @param {...object} props.props - Additional props passed to the underlying button element.
 * @returns {JSX.Element} The rendered button component.
 */
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

/**
 * A button component designed specifically for displaying an icon.
 *
 * @param {object} props - Component props.
 * @param {React.ElementType} props.icon - The icon component to be displayed.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {...object} props.props - Additional props passed to the underlying button element.
 * @returns {JSX.Element} The rendered icon button component.
 */
export const IconButton = ({ icon: Icon, className, ...props }) => {
  return (
    <button className={clsx('btn-icon', className)} {...props}>
      <Icon size={24} />
    </button>
  );
}
