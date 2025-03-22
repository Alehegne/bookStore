"use client";
import {
  ArrowUpDown,
  Book,
  BookText,
  BookType,
  ChartColumnStacked,
  ChartNoAxesCombined,
  LayoutDashboard,
  Settings,
  User,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useAdminRoutes = () => {
  const path = usePathname();

  const routes = useMemo(
    () => [
      {
        name: "Dashboard",
        link: "/admin/dashboard",
        icon: LayoutDashboard,
        active: path === "/admin/dashboard",
      },
      {
        name: "Books",
        link: "/admin/dashboard/books",
        icon: Book,
        active: path === "/admin/dashboard/books",
      },
      {
        name: "Authors",
        link: "/admin/dashboard/authors",
        icon: Users,
        active: path === "/admin/dashboard/authors",
      },
      {
        name: "Publishers",
        link: "/admin/dashboard/publishers",
        icon: BookType,
        active: path === "/admin/dashboard/publishers",
      },
      {
        name: "Categories",
        link: "/admin/dashboard/categories",
        icon: ChartColumnStacked,
        active: path === "/admin/dashboard/categories",
      },
      {
        name: "Users",
        link: "/admin/dashboard/users",
        icon: User,
        active: path === "/admin/dashboard/orders",
      },
      {
        name: "Analytics",
        link: "/admin/dashboard/analytics",
        icon: ChartNoAxesCombined,
        active: path === "/admin/dashboard/analytics",
      },
      {
        name: "Reports",
        link: "/admin/dashboard/reports",
        icon: BookText,
        active: path === "/admin/dashboard/reports",
      },
      {
        name: "Import & Export",
        link: "/admin/dashboard/import-export",
        icon: ArrowUpDown,
        active: path === "/admin/dashboard/import-export",
      },
      {
        name: "Settings",
        link: "/admin/dashboard/settings",
        icon: Settings,
        active: path === "/admin/dashboard/settings",
      },
    ],
    [path]
  );

  return routes;
};

export default useAdminRoutes;
