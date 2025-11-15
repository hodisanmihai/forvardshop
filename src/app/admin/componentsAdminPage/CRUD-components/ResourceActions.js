"use client";

import React, { useContext } from "react";
import { ModalContext } from "../../context/SmallModalContext";

const ResourceActions = ({
  createItem,
  deleteItem,
  itemValue,
  setItemValue,
}) => {
  const { openCreate } = useContext(ModalContext);

  return (
    <div className="bg-blue-900 gap-10 p-2 flex flex-row justify-evenly rounded drop-shadow-2xl">
      <button
        className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer"
        onClick={openCreate}
      >
        {createItem}
      </button>
      <button className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer">
        {deleteItem}
      </button>
    </div>
  );
};

export default ResourceActions;
