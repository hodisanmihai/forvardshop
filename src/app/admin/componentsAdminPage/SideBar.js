"use client";

import React from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";

const SideBar = ({ isOpen, setIsOpen }) => {
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
        <Link href="../admin">
          <div className="p-2 hover:bg-blue-700 rounded">Home</div>
        </Link>

        <details className="mt-2 ">
          <summary className="p-2 hover:bg-blue-700 rounded cursor-pointer  ">
            Lucru Time
          </summary>
          <div className="pl-4 mt-1 flex flex-col gap-1 ">
            <Link href="../admin/culori">
              <div className="p-2 hover:bg-blue-700 rounded">Culori</div>
            </Link>
            <Link href="../admin/brands">
              <div className="p-2 hover:bg-blue-700 rounded">Brand</div>
            </Link>
            <Link href="../admin/categorii">
              <div className="p-2 hover:bg-blue-700 rounded">Categorii</div>
            </Link>
            <Link href="../admin/distribuitori">
              <div className="p-2 hover:bg-blue-700 rounded">Distribuitori</div>
            </Link>
          </div>
        </details>
      </div>
      {/* End Menu List */}
    </div>
  );
};

export default SideBar;
