"use client";

import React, { useState } from "react";
import SideBar from "./componentsAdminPage/SideBar";
import CreateSmallItem from "./componentsAdminPage/CRUD-components/CreateSmallItem";
import { ModalProvider } from "./context/SmallModalContext";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // pentru sidebar

  return (
    <ModalProvider>
      <div className="flex w-screen">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1">{children}</main>
        <CreateSmallItemWrapper />
      </div>
    </ModalProvider>
  );
}

// Wrapper pentru CreateSmallItem ca sa folosim context corect
import { useContext } from "react";
import { ModalContext } from "./context/SmallModalContext";

const CreateSmallItemWrapper = () => {
  const { isModalOpen, closeCreate } = useContext(ModalContext);
  return <CreateSmallItem visible={isModalOpen} onClose={closeCreate} />;
};
