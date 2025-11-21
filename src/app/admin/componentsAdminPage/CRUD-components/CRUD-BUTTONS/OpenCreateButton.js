"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/app/admin/context/SmallModalContext";
import { supabase } from "../../../../../../lib/supabase";

const OpenCreateButton = ({
  createItem,
  itemValue,
  tableName,
  setItemValue,
}) => {
  const { openCreate, showSuccessNotification } = useContext(ModalContext);

  const handleOpenCreate = () => {
    openCreate(tableName, async (newItemValue) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert(newItemValue)
        .select("*");

      if (error) {
        console.error(error);
        alert(`Nu s-a putut crea ${tableName}.`);
      } else {
        setItemValue([...itemValue, data[0]]);
        // Show success notification
        if (showSuccessNotification) {
          showSuccessNotification(tableName);
        }
      }
    });
  };

  return (
    <>
      <button
        className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer"
        onClick={handleOpenCreate}
      >
        {createItem}
      </button>
    </>
  );
};

export default OpenCreateButton;
