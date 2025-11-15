"use client";

import React, { useState } from "react";
import SideBar from "./componentsAdminPage/SideBar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-screen  ">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
