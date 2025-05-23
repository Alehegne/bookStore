"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

const LogInShema = z.object({
  password: z
    .string()
    .min(4, { message: "Password should be more than char" })
    .max(100),
  email: z.string().email("Invalid email"),
});

const Page = () => {
  const router = useRouter();
  const { login, googleLogin } = useAuth();
  const defaultValues = { email: "", password: "" };

  const form = useForm<z.infer<typeof LogInShema>>({
    resolver: zodResolver(LogInShema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof LogInShema>) {
    try {
      await login(values.email, values.password);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      alert("logged in");
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[400px] bg-white p-4 rounded-md shadow-2xl"
        >
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
          <Button type="submit">Log In</Button>
          <div>
            <p className="pmedium">
              Don't have an account
              <span
                onClick={() => router.push("/register")}
                className="ml-4 text-blue-600 text-[14px] hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            type="button"
            className="w-full hover:bg-gray-900 hover:scale-[1.02] active:scale-100 bg-gray-800 pmedium text-white"
          >
            Log in with google
          </Button>
          <p className="text-xs text-center font-extralight">
            2025 bookStore.all rights reserved
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Page;
