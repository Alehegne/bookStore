"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store/cart";

const CheckOutSchema = z.object({
  email: z.string().email("Invalid email"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string(),
  address: z.string().min(2, "Address must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().min(2, "ZIP code must be at least 2 characters"),
});

const CheckOutPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((acc, item) => (acc += item.newPrice), 0);

  const defaultValues = {
    password: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zip: "",
  };
  const form = useForm<z.infer<typeof CheckOutSchema>>({
    resolver: zodResolver(CheckOutSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof CheckOutSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values", values);
    const newOrder = {
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      address: {
        address: values.address,
        city: values.city,
        country: values.country,
        state: values.state,
        zip: values.zip,
      },
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
    };

    console.log("new orders", newOrder);
  }

  return (
    <section className="customBody h-[90vh] w-full">
      <div className="bg-white h-full px-8 py-14">
        <div className="flex  items-start gap-8 flex-col md:flex-row justify-between h-full ">
          <div className="flex flex-col gap-4 items-start">
            <h1 className="h1">Cash On delivery</h1>
            <p className="text-gray-800/80 pmedium">
              Total Price:<span className="pbold ml-4">${totalPrice}</span>{" "}
            </p>
            <p className="text-gray-700/80">
              items:<span className="ml-4 pbold">{totalItems}</span>
            </p>
          </div>
          <div className="flex-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-100 border-none focus:ring-0  focus:outline-none"
                          placeholder="John Doe"
                          {...field}
                        />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-100 border-none focus:ring-0  focus:outline-none"
                          placeholder="example@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-100 border-none focus:ring-0  focus:outline-none"
                          placeholder="+231922342244"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Address/Street</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100  border-none focus:ring-0  focus:outline-none"
                            placeholder="1234 Main St"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>city</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 flex-1  border-none focus:ring-0  focus:outline-none"
                            placeholder="AddisAbaba"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>country/region</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100  border-none focus:ring-0  focus:outline-none"
                            placeholder="Ethiopia"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>state/Province</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 border-none focus:ring-0  focus:outline-none"
                            placeholder="AddisAbaba"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 border-none focus:ring-0  focus:outline-none"
                            placeholder="1000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                    className="w-5 h-5"
                    type="checkbox"
                  />
                  <p className="flex-1 pmedium">
                    i agree to the{" "}
                    <span className="text-sky-600 underline ">
                      Terms & Conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-sky-600 underline">
                      Shopping poility
                    </span>
                    .
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button
                    disabled={!isChecked}
                    className="flex-end hover:scale-105 bg-amber-300 active:scale-100 transition-all"
                    size="lg"
                    type="submit"
                  >
                    Place An Order
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOutPage;
