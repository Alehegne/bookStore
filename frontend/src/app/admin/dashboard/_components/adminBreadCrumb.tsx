import useBreadCrumb from "@/hooks/useBreadCrumb";
import React from "react";

const AdminBread = () => {
  const { breadCrumb, path, pathArray } = useBreadCrumb();

  return <div>AdminBread</div>;
};

export default AdminBread;
