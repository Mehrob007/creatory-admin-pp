"use cline";
import React from "react";
import { navBar } from "./menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftMenu() {
  const pathName = usePathname();
  console.log("pathName", pathName);

  return (
    <div className="left-menu">
      <div className="left-menu-content">
        <h1>
          PRIME PARKING <br />
          <span>PANEL</span>
        </h1>
        <nav>
          {navBar.map((e, i) => (
            <Link
              key={i}
              className={pathName === e.path ? "active-link" : ""}
              href={e.path}
            >
              {e.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
