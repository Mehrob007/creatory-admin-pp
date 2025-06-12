import React from "react";
import { navBar } from "./menu";
import Link from "next/link";
import Image from "next/image";

export default function LeftMenu() {
  return (
    <div className="left-menu">
      <div className="left-menu-content">
        <h1>
          PRIME PARKING <br />
          <span>PANEL</span>
        </h1>
        <nav>
          {navBar.map((e, i) => (
            <Link key={i} href={e.path}>
              {e.title}
            </Link>
          ))}
        </nav>
      </div>
      <Image
        src="/icons/logo-creatory.svg"
        alt="logo-creatory"
        width={194}
        height={52.96}
      />
    </div>
  );
}
