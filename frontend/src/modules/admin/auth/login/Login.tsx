import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";

const userFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export const Login = () => {
  const { user } = useAuth();
  const { mutate } = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "example@gmail.com",
      password: ""
    }
  });

  if (user) {
    return <Navigate to={"/admin/create-movie"} />;
  }

  const onSubmit: SubmitHandler<z.infer<typeof userFormSchema>> = data => {
    mutate(data);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" {...register("email")} />

        <Input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <Button type="submit" variant={"outline"}>
          Login
        </Button>
      </form>
    </div>
  );
};
