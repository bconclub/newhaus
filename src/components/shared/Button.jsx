import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-heading transition-all duration-300 rounded-md w-auto';

  const variants = {
    primary: 'bg-nh-copper text-white hover:bg-nh-orange hover:shadow-lg',
    secondary: 'bg-transparent border-2 border-nh-copper text-nh-copper hover:bg-nh-copper hover:text-white',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-nh-charcoal',
  };

  const sizes = {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2.5 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
