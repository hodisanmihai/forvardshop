"use client";

import React, { useContext } from "react";
import { ModalContext } from "../../context/SmallModalContext";
import { supabase } from "../../../../../lib/supabase";

const ResourceActions = ({
  createItem,
  deleteItem,
  itemValue,
  tableName,
  setItemValue,
  selectedItemsForDelete,
}) => {
  const { openCreate } = useContext(ModalContext);

  // 1. Creează item
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
        // adăugăm obiectul complet cu ID în listă
        setItemValue([...itemValue, data[0]]);
      }
    });
  };

  // 2. Ștergere iteme selectate
  const handleDeleteSelected = async () => {
    if (selectedItemsForDelete.length === 0) return;

    const confirmDelete = window.confirm(
      `Sigur vrei să ștergi ${selectedItemsForDelete.length} item(e)?`
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from(tableName)
      .delete()
      .in("id", selectedItemsForDelete);

    if (error) {
      console.error(error);
      alert("Nu s-a putut șterge itemele.");
      return;
    }

    setItemValue(
      itemValue.filter((i) => !selectedItemsForDelete.includes(i.id))
    );

    setSelectedItemsForDelete([]);
  };

  return (
    <div className="bg-blue-900 gap-10 p-2 flex flex-row justify-evenly rounded drop-shadow-2xl">
      <button
        className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer"
        onClick={handleOpenCreate}
      >
        {createItem}
      </button>

      <button
        className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer"
        onClick={handleDeleteSelected}
      >
        {deleteItem}
      </button>
    </div>
  );
};

export default ResourceActions;
