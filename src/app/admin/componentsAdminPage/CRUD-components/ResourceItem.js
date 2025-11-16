"use client";

import React from "react";

const ResourceItem = ({
  itemLabel,
  itemValue,
  selectedItemsForDelete,
  setSelectedItemsForDelete,
}) => {
  const handleSelect = (itemId) => {
    if (selectedItemsForDelete.includes(itemId)) {
      setSelectedItemsForDelete(
        selectedItemsForDelete.filter((id) => id !== itemId)
      );
    } else {
      setSelectedItemsForDelete([...selectedItemsForDelete, itemId]);
    }
  };

  return (
    <div className="bg-blue-900 gap-10 p-10 w-full rounded-2xl drop-shadow-2xl flex flex-wrap justify-start">
      {/* Total iteme */}
      <div>Total: {itemValue.length || 0}</div>

      {/* Lista de iteme */}
      <div className="w-full gap-10 flex flex-wrap justify-start">
        {itemValue.map((item) => (
          <div
            key={item.id}
            className={`min-w-[200px] flex-1 h-[200px] rounded p-5 flex flex-col justify-center items-center whitespace-nowrap overflow-hidden text-ellipsis
            ${
              selectedItemsForDelete.includes(item.id)
                ? "bg-red-700"
                : "bg-blue-800"
            } hover:bg-blue-700 gap-5`}
            onClick={() => handleSelect(item.id)}
          >
            <span>ID : {item.id}</span>

            <div className="flex gap-2 text-xl flex-col">
              <span>{itemLabel} :</span>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceItem;
