import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return axios.post("http://localhost:3000/api/auth/login", {
        email,
        password
      });
    }
  });
};
