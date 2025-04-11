import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { LoginFormValues } from "../schemas/loginSchema";
import { RegisterFormValues } from "../schemas/registerSchema";
import { useAuth } from "../context/AuthContext";

export const useRegister = () => {
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const response = await api.post("/users/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.data);
    },
  });
};

export const useLogin = () => {
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await api.post("/users/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.data);
    },
  });
};

export const useGetProfile = () => {
  const { token } = useAuth();
  
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get("/users/profile");
      return response.data;
    },
    enabled: !!token, // Only run if there is a token
  });
};
