"use client";

import React, { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { usePostAdminMutation } from "../Redux/features/backendConnection/userApi";

import Swal from "sweetalert2";
import Loading from "@/components/shared/loading";

const AdminSchema = z.object({
  password: z
    .string()
    .min(4, { message: "Password should be more than char" })
    .max(100),
  userName: z.string({ message: "the user name should be string" }),
});

const Page = () => {
  // const router = useRouter();
  // const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [adminLogIn, { isLoading }] = usePostAdminMutation();
  const defaultValues = { password: "", userName: "" };

  const form = useForm<z.infer<typeof AdminSchema>>({
    resolver: zodResolver(AdminSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof AdminSchema>) {
    adminLogIn(values)
      .unwrap()
      .then((res) => {
        console.log("success res", res);
        const token = res.token;

        //store the token in local storage

        if (token) {
          sessionStorage.setItem("adminToken", token);
          router.push("/admin/dashboard");
          Swal.fire({
            icon: "success",
            title: `Welcome, ${values.userName}`,
            text: "You have successfully logged in as admin",
            showConfirmButton: false,
            timer: 2000,
            position: "center",
          });
        }
      })
      .catch((err) => {
        console.log("error in ", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.data.message,
          confirmButtonText: "OK",
        });
      });
  }

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[400px] bg-white p-4 rounded-md shadow-2xl"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="text"
                    required
                    autoFocus
                    className="border-none  bg-gray-50 ring-0 focus:outline-hidden "
                    placeholder="user name"
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
                <FormLabel>password</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      className="border-none w-full h-full ring-0 focus:outline-hidden "
                      type={showPassword ? "text" : "password"}
                      placeholder="pass word"
                      {...field}
                    />

                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      whileTap={{ scale: 0.85 }}
                    >
                      {showPassword ? (
                        <motion.div
                          key="eye"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Eye className="w-5 h-5 text-gray-600" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="eye-off"
                          initial={{ opacity: 0, rotate: 90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: -90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <EyeOff className="w-5 h-5 text-gray-600" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Admin log in</Button>

          <p className="text-xs text-center font-extralight">
            2025 bookStore.all rights reserved
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Page;
