import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../useAuthContext";
import { useSignup } from "../hooks/useSignup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z
  .object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string()
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"]
  });

type SignupForm = z.infer<typeof schema>;

export const Signup = () => {
  const { login, user } = useAuth();
  const mutation = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupForm>({ resolver: zodResolver(schema) });

  if (user) {
    return <Navigate to="/admin/create-movie" />;
  }

  const onSubmit = async (data: SignupForm) => {
    const result = await mutation.mutateAsync({
      email: data.email,
      password: data.password
    });
    login(result.id);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="password"
              placeholder="Confirm password"
              {...register("confirm")}
            />
            {errors.confirm && (
              <p className="text-sm text-red-500">{errors.confirm.message}</p>
            )}
          </div>

          {mutation.error && (
            <p className="text-sm text-red-500">{mutation.error.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/admin/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
