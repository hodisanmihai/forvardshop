"use client";

import React from "react";
import SideBar from "./componentsAdminPage/SideBar";
import { useState } from "react";
const Page = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-800 w-full h-screen flex p-10">Echipa Farvard</div>
  );
};

export default Page;
