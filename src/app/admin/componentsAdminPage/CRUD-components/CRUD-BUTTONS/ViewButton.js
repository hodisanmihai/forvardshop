"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/app/admin/context/SmallModalContext";

const ViewButton = ({ selectedItemsForDelete, itemValue, tableName }) => {
  const { openViewProduct } = useContext(ModalContext);

  const handleView = () => {
    if (selectedItemsForDelete.length === 0) {
      alert("Selectează un produs pentru a-l vizualiza.");
      return;
    }

    if (selectedItemsForDelete.length > 1) {
      alert("Selectează doar un produs pentru a-l vizualiza.");
      return;
    }

    const product = itemValue.find(
      (item) => item.id === selectedItemsForDelete[0]
    );

    if (product && openViewProduct) {
      openViewProduct(product);
    }
  };

  return (
    <button
      className="bg-green-600 p-6 rounded hover:bg-green-500 cursor-pointer text-white"
      onClick={handleView}
    >
      Vezi Produs
    </button>
  );
};

export default ViewButton;
