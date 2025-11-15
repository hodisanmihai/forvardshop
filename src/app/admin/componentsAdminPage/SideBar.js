"use client";

import React from "react";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`min-h-screen bg-blue-900 p-6 flex flex-col items-end transition-all duration-300 ${
        isOpen ? "w-[20%]" : "w-16"
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
        <Link href="../admin">
          <div className="p-2 hover:bg-blue-700 rounded">Home</div>
        </Link>
        <Link href="../admin/culori">
          <div className="p-2 hover:bg-blue-700 rounded">Culori</div>
        </Link>
        <Link href="../admin/brands">
          <div className="p-2 hover:bg-blue-700 rounded">Brand</div>
        </Link>
        <Link href="../admin/categories">
          <div className="p-2 hover:bg-blue-700 rounded">Categorii</div>
        </Link>
      </div>
      {/* End Menu List */}
    </div>
  );
};

export default SideBar;
