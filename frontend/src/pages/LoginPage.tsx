import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate } from "react-router-dom";
import { loginSchema, LoginFormValues } from "../schemas/loginSchema";
import TextField from "../components/ui/TextField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useLogin } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { mutate, isLoading, error: apiError } = useLogin();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = (data: LoginFormValues) => {
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
  
  const cardContent = (
    <>
      <h2>Welcome back!</h2>
      
      {apiError && (
        <div className="error-message" role="alert">
          {getErrorMessage(apiError)}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          placeholder="UID"
          type="email"
          {...register("email")}
          error={errors.email}
        />
        
        <TextField
          label="Password"
          placeholder="Password"
          type="password"
          {...register("password")}
          error={errors.password}
        />
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      
      <div className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </div>
    </>
  );
  
  return (
    <div className="auth-page">
      <Card className="auth-card">
        {cardContent}
      </Card>
    </div>
  );
};

export default LoginPage;