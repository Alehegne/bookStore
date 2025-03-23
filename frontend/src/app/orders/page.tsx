"use client";
import React from "react";
import { useGetOrdersByEmailQuery } from "../Redux/features/backendConnection/orderApi";
import { useAuth } from "../context/AuthContext";
import { BookItem } from "@/components/sections/bookItem";
import { OrderStatusBadge } from "@/components/sections/order_status_badge";
import { formatDistanceToNow } from "date-fns";
import { Calendar, CreditCard, MapPin, Package, User } from "lucide-react";
import Loading from "@/components/shared/loading";

const Orders = () => {
  const { user } = useAuth();
  // console.log("user in Orders", user);

  const { data, isLoading, isError } = useGetOrdersByEmailQuery({
    email: user?.email,
  });

  // console.log("orderedItem", data);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="text-red-500 customBody flex items-center justify-center">
        Error fetching orders
      </div>
    );
  }

  return (
    <div className="customBody">
      <div className="flex flex-col gap-6">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Order Details</h1>
            <p className="text-muted-foreground">Order #{data?._id}</p>
          </div>
          <div className="flex flex-col items-end">
            <OrderStatusBadge status={data?.status as string} />
            <p className="text-sm text-muted-foreground mt-1">
              Placed{" "}
              {data?.createdAt &&
                formatDistanceToNow(data.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        {/* Order Summary and Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Books Section - Takes 2/3 of the space on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border border-gray-300/15 shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                <span>Books in Your Order</span>
              </h2>
              <div className="divide-y">
                {data?.productIds.map((id) => (
                  <BookItem key={id} id={id} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Info Section - Takes 1/3 of the space on large screens */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-card rounded-lg border border-gray-300/15 shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Summary</span>
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${data?.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>
                    ${data?.totalPrice && (data.totalPrice * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2 border-gray-300/15">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      ${data?.totalPrice && (data.totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-card rounded-lg border border-gray-300/15 shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Customer Information</span>
              </h2>
              <div className="space-y-3">
                <p className="font-medium">{data?.name}</p>
                <p className="text-muted-foreground">{data?.email}</p>
                <p className="text-muted-foreground">{data?.phone}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-lg border border-gray-300/15 shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Shipping Address</span>
              </h2>
              <div className="space-y-1">
                <p>{data?.address.address}</p>
                <p>
                  {data?.address.city}, {data?.address.state}{" "}
                  {data?.address.zip}
                </p>
                <p>{data?.address.country}</p>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-card rounded-lg border border-gray-300/15 shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>Order Timeline</span>
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Order Placed</span>
                  <span className="text-sm">
                    {data?.createdAt &&
                      new Date(data.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-sm">
                    {data?.updatedAt &&
                      new Date(data.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Estimated Delivery
                  </span>
                  <span className="text-sm">March 25, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
