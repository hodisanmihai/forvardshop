"use client";
import { createContext, useState } from "react";
import SuccessNotification from "../componentsAdminPage/CRUD-components/SuccessNotification";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [createCallback, setCreateCallback] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [viewProduct, setViewProduct] = useState(null);
  const [modifyProduct, setModifyProduct] = useState(null);
  const [modifyCallback, setModifyCallback] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const openCreate = (resourceName, callback) => {
    setCurrentResource(resourceName);
    setCreateCallback(() => callback);
    setIsModalOpen(true);
    setViewProduct(null);
    setModifyProduct(null);
    setIsViewMode(false);
  };

  const openViewProduct = (product) => {
    setCurrentResource("Produse");
    setViewProduct(product);
    setIsModalOpen(true);
    setIsViewMode(true);
    setModifyProduct(null);
  };

  const openModifyProduct = (product, setItemValue) => {
    setCurrentResource("Produse");
    setModifyProduct(product);
    setModifyCallback(() => async (productId, updatedData) => {
      const { supabase } = await import("../../../../lib/supabase");
      // Update timp
      const dataWithTimestamp = {
        ...updatedData,
        updated_at: new Date().toISOString(),
      };
      const { data, error } = await supabase
        .from("Produse")
        .update(dataWithTimestamp)
        .eq("id", productId)
        .select("*");

      if (error) {
        console.error("Error updating product:", error);
        alert("Eroare la actualizarea produsului.");
        throw error;
      } else {
        // Update local state
        setItemValue((prev) =>
          prev.map((item) => (item.id === productId ? data[0] : item))
        );
      }
    });
    setIsModalOpen(true);
    setIsViewMode(false);
    setViewProduct(null);
  };

  const closeCreate = () => {
    setIsModalOpen(false);
    setCurrentResource(null);
    setCreateCallback(null);
    setViewProduct(null);
    setModifyProduct(null);
    setModifyCallback(null);
    setIsViewMode(false);
  };

  const showSuccessNotification = (messageOrResourceName) => {
    // Daca e formatat il foloseste daca nu il il formateaza
    const message =
      messageOrResourceName.includes("creat/a!") ||
      messageOrResourceName.includes("actualizat/a!")
        ? messageOrResourceName
        : `${messageOrResourceName} creat/a!`;
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const hideSuccessNotification = () => {
    setShowSuccess(false);
    setSuccessMessage("");
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        currentResource,
        createCallback,
        openCreate,
        closeCreate,
        showSuccessNotification,
        viewProduct,
        modifyProduct,
        modifyCallback,
        isViewMode,
        openViewProduct,
        openModifyProduct,
        setIsViewMode,
      }}
    >
      {children}
      {showSuccess && (
        <SuccessNotification
          message={successMessage}
          onClose={hideSuccessNotification}
        />
      )}
    </ModalContext.Provider>
  );
};
