"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/app/admin/context/SmallModalContext";

const ModifyButton = ({
  selectedItemsForDelete,
  itemValue,
  tableName,
  setItemValue,
}) => {
  const { openModifyProduct } = useContext(ModalContext);

  const handleModify = () => {
    if (selectedItemsForDelete.length === 0) {
      alert("Selectează un produs pentru a-l modifica.");
      return;
    }

    if (selectedItemsForDelete.length > 1) {
      alert("Selectează doar un produs pentru a-l modifica.");
      return;
    }

    const product = itemValue.find(
      (item) => item.id === selectedItemsForDelete[0]
    );

    if (product && openModifyProduct) {
      openModifyProduct(product, setItemValue);
    }
  };

  return (
    <button
      className="bg-yellow-600 p-6 rounded hover:bg-yellow-500 cursor-pointer text-white"
      onClick={handleModify}
    >
      Modifică Produs
    </button>
  );
};

export default ModifyButton;
