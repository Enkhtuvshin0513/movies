import { Navigate } from "react-router-dom";
import { useAuth } from "../useAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userFormSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
});

export const Login = () => {
  const { user } = useAuth();
  const { handleSubmit, register } = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  if (user) {
    return <Navigate to={"/admin/create-movie"} />;
  }

  const onSubmit: SubmitHandler<z.infer<typeof userFormSchema>> = data => {
    if (data.password.length < 6) {
      console.log("12312");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="email" {...register("email")} />
        <Input type="password" {...register("password")} />

        <Button type="submit" variant={"outline"}>
          Login
        </Button>
      </form>
    </div>
  );
};
