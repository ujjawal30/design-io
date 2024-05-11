"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, LoginSchemaType } from "@/lib/schemas/login.schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    console.log("data :>> ", data);
    const signInResponse = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (signInResponse?.ok) {
      router.push("/dashboard");
    } else {
      form.setError("root", {
        message: signInResponse?.error!,
      });
      form.resetField("password");
    }
  };

  const onInputChange = (value: string, onFieldChange: (value: string) => void) => {
    onFieldChange(value);
    form.clearErrors("root");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-semibold">E-mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="auth-input"
                  placeholder="E-mail"
                  type="email"
                  onChange={(e) => onInputChange(e.target.value, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="auth-input"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => onInputChange(e.target.value, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button className="w-full bg-primary-purple font-semibold !mt-6" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
