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
  const baseStyles = 'inline-block font-medium transition-all duration-300 rounded-md text-center';

  const variants = {
    primary: 'bg-nh-copper text-white hover:bg-nh-orange hover:shadow-lg',
    secondary: 'bg-transparent border-2 border-nh-copper text-nh-copper hover:bg-nh-copper hover:text-white',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-nh-charcoal',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
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
