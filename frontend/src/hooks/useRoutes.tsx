/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Heart, Home, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type RouteType = {
  label: string;
  icon: React.FC<any>;
  link: string;
  active: boolean;
};

export default function useRoutes() {
  const pathName = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        icon: Home,
        link: "/",
        active: pathName === "/",
      },
      {
        label: "Profile",
        icon: User,
        link: "/profile",
        active: pathName === "/profile",
      },
      {
        label: "WishList",
        icon: Heart,
        link: "/wishList",
        active: pathName === "/wishList",
      },
      {
        label: "Cart",
        icon: ShoppingCart,
        link: "/cart",
        active: pathName === "/cart",
      },
    ],
    [pathName]
  );

  return routes;
}
