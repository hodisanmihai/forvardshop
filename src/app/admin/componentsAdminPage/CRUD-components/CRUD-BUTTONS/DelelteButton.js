"use client";

import React from "react";
import { supabase } from "../../../../../../lib/supabase";

const DelelteButton = ({
  selectedItemsForDelete,
  deleteItem,
  tableName,
  itemValue,
  setItemValue,
}) => {
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
    <div>
      {" "}
      <button
        className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer"
        onClick={handleDeleteSelected}
      >
        {deleteItem}
      </button>
    </div>
  );
};

export default DelelteButton;
