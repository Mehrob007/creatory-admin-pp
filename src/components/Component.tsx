"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import LeftMenu from "./menu/LeftMenu";
import Image from "next/image";
import { useFormStore } from "@/hooks/useFormStore";

interface ComponentProps {
  children: ReactNode;
}

export default function Component({ children }: ComponentProps) {
  const pathName = usePathname();
  const { setDataClear, data, } = useFormStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // router.replace("/");
      setDataClear();
    } else {
      router.replace("/login");
    }
  }, [pathName, router]);

  console.log("data", data);
  

  return (
    <div
      className={`component ${pathName !== "/login" ? "component-pages" : ""}`}
    >
      {pathName !== "/login" ? (
        <>
          <div className="left-menu-div">
            <LeftMenu />
            <Image
              src="/icons/logo-creatory.svg"
              alt="logo-creatory"
              width={194}
              height={52.96}
            />
          </div>
        </>
      ) : (
        ""
      )}
      <div></div>
      {children}
    </div>
  );
}
