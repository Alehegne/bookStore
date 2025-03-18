import { useAuth } from "@/app/context/AuthContext";
import { redirect } from "next/navigation";
import React from "react";

interface PrivateProps {
  children: React.ReactNode;
}

const Private: React.FC<PrivateProps> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <>{children}</>;
  }
  return redirect("/logIn");
};

export default Private;
