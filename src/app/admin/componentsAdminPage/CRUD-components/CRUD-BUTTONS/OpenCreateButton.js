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
  const { openCreate } = useContext(ModalContext);

  const handleOpenCreate = () => {
    openCreate(createItem, async (newItemValue) => {
      const { data, error } = await supabase
        .from(tableName)
        .insert({ name: newItemValue })
        .select("*");

      if (error) {
        console.error(error);
        alert(`Nu s-a putut crea ${tableName}.`);
      } else {
        setItemValue([...itemValue, data[0]]);
      }
    });
  };

  return (
    <>
      {" "}
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
