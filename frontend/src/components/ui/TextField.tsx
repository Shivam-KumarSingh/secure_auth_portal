// src/components/ui/TextField.tsx
import React, { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(" ", "-");
    
    return (
      <div className="form-group">
        <label htmlFor={inputId}>{label}</label>
        <input
          id={inputId}
          className="form-control"
          ref={ref}
          {...props}
        />
        {error && <p className="error-message">{error.message}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;