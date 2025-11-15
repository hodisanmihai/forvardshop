"use client";
import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreate = () => setIsModalOpen(true);
  const closeCreate = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openCreate,
        closeCreate,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
