import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/api";

export const useSignup = () =>
  useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signup(email, password)
  });
