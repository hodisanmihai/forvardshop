"use client";

import React, { useState } from "react";
import SideBar from "./componentsAdminPage/SideBar";
import CreateItem from "./componentsAdminPage/CRUD-components/CreateItem";
import { ModalProvider } from "./context/SmallModalContext";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalProvider>
      <div className="flex w-screen">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1">{children}</main>
        <OpenCreateItemWrapper />
      </div>
    </ModalProvider>
  );
}

// Wrapper pentru CreateSmallItem ca sa folosim context corect
import { useContext } from "react";
import { ModalContext } from "./context/SmallModalContext";

const OpenCreateItemWrapper = () => {
  const { isModalOpen, closeCreate } = useContext(ModalContext);
  return <CreateItem visible={isModalOpen} onClose={closeCreate} />;
};
