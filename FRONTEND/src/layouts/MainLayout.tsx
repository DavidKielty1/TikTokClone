import React from "react";
import TopNav from "../components/TopNav";
import { useLocation } from "react-router-dom";
import SideNav from "../components/SideNav";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <TopNav />

        <div
          className={[
            useLocation().pathname === "/" ? "max-w-[1140px]" : "",
            "flex justify-between mx-auto w-full lg:px-2.5 px-0",
          ].join(" ")}
        >
          <SideNav />
        </div>
        {children}
      </header>
    </div>
  );
}

export default MainLayout;