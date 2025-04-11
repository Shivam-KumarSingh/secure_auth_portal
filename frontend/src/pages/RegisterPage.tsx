import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router-dom";
import { registerSchema, RegisterFormValues } from "../schemas/registerSchema";
import TextField from "../components/ui/TextField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useRegister } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { mutate, isLoading, error: apiError } = useRegister();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit"
  });
  
  const onSubmit = (data: RegisterFormValues) => {
    mutate(data);
  };
  
  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  // Helper function to get error message from API response
  const getErrorMessage = (error: any) => {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return "An unexpected error occurred. Please try again.";
  };
  
  return (
    <div className="auth-page">
      <Card className="auth-card">
        <>
          <h2>Register</h2>
          
          {apiError && (
            <div className="error-message" role="alert">
              {getErrorMessage(apiError)}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email}
            />
            
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password}
            />
            
            <TextField
              label="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          
          <div className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </>
      </Card>
    </div>
  );
};

export default RegisterPage;