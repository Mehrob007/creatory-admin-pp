"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import LeftMenu from "./menu/LeftMenu";

interface ComponentProps {
  children: ReactNode;
}

export default function Component({ children }: ComponentProps) {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, [pathName, router]);

  return (
    <div
      className={`component ${pathName !== "/login" ? "component-pages" : ""}`}
    >
      {pathName !== "/login" ? <LeftMenu /> : ""}
      {children}
    </div>
  );
}
