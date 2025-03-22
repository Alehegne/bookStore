"use client";

import Loading from "@/components/shared/loading";
import { decodeJwt } from "@/lib/utils";
import { isTokenExpired as isExpired } from "@/lib/utils";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import DashBoard from "./_components/DashBoard";

interface UserInfo {
  userName: string;
  token: string;
  exp: number;
  id: string;
}

const Page = () => {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  const [isTokenExpired, setIsTokenExpired] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const checkToken = () => {
      const token = sessionStorage.getItem("adminToken");
      const decode = decodeJwt(token as string);
      if (!token) {
        router.push("/admin");
        return;
      }
      if (decode) {
        setIsTokenExpired(isExpired(decode.exp as number));
        setUserInfo(decode as UserInfo);
      }
    };

    checkToken();

    const intervalId = setInterval(() => {
      //remove the token from session storage if expired
      if (isTokenExpired) {
        sessionStorage.removeItem("adminToken");
        setUserInfo(null);
      }

      checkToken();
    }, 30000);

    setMounted(true);
    setIsLoading(false);

    return () => clearInterval(intervalId);
  }, [router, isTokenExpired]);

  useEffect(() => {
    if (isTokenExpired && mounted) {
      Swal.fire({
        title: "Time Out",
        text: "your session has been expired, please log in again",
        confirmButtonText: "OK!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/admin");
          return;
        }
      });
    }
  }, [router, isTokenExpired, mounted]);

  return (
    <>
      {mounted && !isTokenExpired ? (
        <DashBoard />
      ) : (
        <>{isLoading && !isTokenExpired && <Loading />}</>
      )}
    </>
  );
};

export default Page;
