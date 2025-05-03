import { twMerge } from 'tailwind-merge';

/**
 * Button component for rendering customizable buttons with different sizes and variants.
 *
 * @param {Object} props - Component props
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - The size of the button
 * @param {'primary' | 'secondary' | 'tertiary'} [props.variant='primary'] - The visual variant of the button
 * @param {React.ReactElement} [props.leadingIcon] - Optional icon displayed before the button content
 * @param {React.ReactElement} [props.trailingIcon] - Optional icon displayed after the button content
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {React.ReactNode} props.children - The content of the button
 * @param {string} [props.className] - Additional class names for the button
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Any other native button attributes
 * @returns {JSX.Element} Rendered button element
 */
const Button = ({
                  size = 'md',
                  variant = 'primary',
                  leadingIcon,
                  trailingIcon,
                  disabled,
                  children,
                  className = '',
                  ...props
                }) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition';

  const sizeClasses = {
    sm: 'px-3 py-1 text-[var(--font-size-sm)] leading-[var(--line-height-sm)]',
    md: 'px-4 py-2 text-[var(--font-size-md)] leading-[var(--line-height-md)]',
    lg: 'px-6 py-3 text-[var(--font-size-lg)] leading-[var(--line-height-lg)]',
    xl: 'px-6 py-3 text-[var(--font-size-display-md)] leading-[var(--line-height-display-md)]',
  };

  const variantClasses = {
    primary:
      'border border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-secondary)] hover:bg-[var(--color-naturals-850)]',
    secondary:
      'border border-[var(--color-default)] bg-[var(--color-secondary)] text-black hover:border-[var(--color-naturals-400)]',
    tertiary:
      'border border-[var(--color-secondary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-grayscale-50)]',
  };

  const disabledClasses = {
    primary: 'bg-[var(--color-default)] text-[var(--color-secondary)] cursor-not-allowed opacity-50',
    secondary:
      'bg-[var(--color-naturals-100)] text-[var(--color-default)] cursor-not-allowed opacity-50',
    tertiary:
      'bg-transparent border-[var(--color-default)] text-[var(--color-default)] cursor-not-allowed opacity-50',
  };

  const classes = twMerge(
    baseClasses,
    sizeClasses[size],
    disabled ? disabledClasses[variant] : variantClasses[variant],
    className
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {leadingIcon && <span className="mr-2">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
    </button>
  );
};

export default Button;
