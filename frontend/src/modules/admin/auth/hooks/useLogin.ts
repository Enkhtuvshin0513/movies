import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/api";

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password)
  });
