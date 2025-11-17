"use client";

import React from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";

const SideBar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { name: "Produse", href: "/admin/lucru-time/produse" },
    { name: "Culori", href: "/admin/lucru-time/culori" },
    { name: "Brand", href: "/admin/lucru-time/brands" },
    { name: "Categorii", href: "/admin/lucru-time/categorii" },
    { name: "Distribuitori", href: "/admin/lucru-time/distribuitori" },
  ];

  return (
    <div
      className={`min-h-screen bg-blue-900 p-6 flex flex-col items-end transition-all duration-300 ${
        isOpen ? "md:w-[20%] w-[90%] " : "w-16"
      }`}
    >
      <button className="pb-4" onClick={() => setIsOpen(!isOpen)}>
        <CiMenuBurger size={24} />
      </button>
      {/* Menu List */}
      <div
        className={`transition-all duration-800 overflow-hidden ${
          isOpen ? "opacity-100 w-full" : "opacity-0 w-100"
        }`}
      >
        {/* HOME BUTTON */}
        <Link href="../../admin">
          <div className="p-2 hover:bg-blue-700 rounded">Home</div>
        </Link>

        <details className="mt-2 ">
          <summary className="p-2 hover:bg-blue-700 rounded cursor-pointer  ">
            Lucru Time
          </summary>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="p-2 hover:bg-blue-700 rounded">{item.name}</div>
            </Link>
          ))}
        </details>
      </div>
      {/* End Menu List */}
    </div>
  );
};

export default SideBar;
