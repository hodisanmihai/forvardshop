"use client";
import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [createCallback, setCreateCallback] = useState(null);

  const openCreate = (resourceName, callback) => {
    setCurrentResource(resourceName);
    setCreateCallback(() => callback);
    setIsModalOpen(true);
  };

  const closeCreate = () => {
    setIsModalOpen(false);
    setCurrentResource(null);
    setCreateCallback(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        currentResource,
        createCallback,
        openCreate,
        closeCreate,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
