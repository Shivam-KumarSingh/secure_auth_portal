import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) => {
  const baseClasses = "btn";
  
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <button 
      className={classes} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
