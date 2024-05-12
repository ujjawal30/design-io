"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema, RegisterSchemaType } from "@/lib/schemas/register.schema";
import { registerUser } from "@/lib/actions/user.actions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    console.log("data :>> ", data);
    const registerUserResponse = await registerUser(data);
    console.log("registerUserResponse :>> ", registerUserResponse);

    if (registerUserResponse.status) {
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
      }
    } else {
      form.setError("root", {
        message: registerUserResponse.message,
      });
    }

    form.resetField("password");
    form.resetField("confirmPassword");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-semibold">Name</FormLabel>
              <FormControl>
                <Input {...field} className="auth-input" placeholder="Name" onChange={(e) => onInputChange(e.target.value, field.onChange)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="flex flex-col gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-300 font-semibold">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="auth-input"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => onInputChange(e.target.value, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button className="w-full bg-primary-purple font-semibold !mt-6" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
