"use client";
import { usePathname } from "next/navigation";

const useBreadCrumb = () => {
  const path = usePathname();
  const pathArray = path.split("/").filter((item) => item !== "");
  const breadCrumb = pathArray.map((item, index) => {
    return {
      name: item,
      link: `/${pathArray.slice(0, index + 1).join("/")}`,
      isActive: index === pathArray.length - 1,
    };
  });
  return {
    breadCrumb,
  };
};

export default useBreadCrumb;
