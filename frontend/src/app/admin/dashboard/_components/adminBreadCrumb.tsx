import useBreadCrumb from "@/hooks/useBreadCrumb";
import Link from "next/link";
import React from "react";

const AdminBread = () => {
  const { breadCrumb } = useBreadCrumb();
  console.log("breadcrubm", breadCrumb.slice(1));

  //ignore for the dashboard
  if (
    breadCrumb.slice(1).length === 1 &&
    breadCrumb[1].link === "/admin/dashboard"
  ) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm">
      {breadCrumb.slice(1).map((item, index) => {
        return (
          <Link
            key={index}
            href={item.link}
            className={`flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-all duration-200 ${
              item.isActive && "text-gray-900 font-bold"
            }`}
          >
            {item.name}
            {index < breadCrumb.length - 2 && (
              <span className="text-gray-400">/</span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminBread;
