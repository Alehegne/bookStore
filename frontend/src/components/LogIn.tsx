"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const LogInShema = z.object({
  password: z
    .string()
    .min(4, { message: "Password should be more than char" })
    .max(100),
  email: z.string().email("Invalid email"),
});
const RegisterSchema = LogInShema.extend({
  username: z
    .string()
    .min(2, { message: "User name should be more than two char" })
    .max(50),
});

const FormComponent = () => {
  const [option, setOption] = React.useState<"login" | "register">("login");
  const router = useRouter();

  const formSchema = option === "login" ? LogInShema : RegisterSchema;

  const defaultValues =
    option === "login"
      ? { email: "", password: "" }
      : { email: "", password: "", username: "" };

  const form = useForm<z.infer<typeof LogInShema | typeof RegisterSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log("submitting form");
    if (option === "login") {
      console.log("loging user");
      console.log(values);
    } else {
      console.log("registering user");
      console.log(values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[400px] bg-white p-4 rounded-md shadow-2xl"
      >
        {option === "register" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="border-none  bg-gray-50 ring-0 focus:outline-hidden "
                    placeholder="user name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input
                  className="border-none  bg-gray-50 ring-0 focus:outline-hidden "
                  placeholder="email"
                  {...field}
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
              <FormLabel>pass word</FormLabel>
              <FormControl>
                <Input
                  className="border-none  bg-gray-50 ring-0 focus:outline-hidden "
                  type="password"
                  placeholder="pass word"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {option === "register" ? "Register" : "Log In"}
        </Button>
        <div>
          {option === "login" ? (
            <p className="pmedium">
              Don't have an account
              <span
                onClick={() => {
                  setOption("register");
                  return router.push("/register");
                }}
                className="ml-4 text-blue-600 text-[14px] hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          ) : (
            <p className="pmedium">
              Already have an account
              <span
                className="ml-4 text-blue-600 hover:underline text-[14px] cursor-pointer"
                onClick={() => {
                  setOption("login");
                  return router.push("/logIn");
                }}
              >
                Log in
              </span>
            </p>
          )}
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full hover:bg-gray-900 bg-gray-800 pmedium text-white"
        >
          {option === "login" ? "Log in with google" : "Register with google"}
        </Button>
        <p className="text-xs text-center font-extralight">
          2025 bookStore.all rights reserved
        </p>
      </form>
    </Form>
  );
};

export default FormComponent;
