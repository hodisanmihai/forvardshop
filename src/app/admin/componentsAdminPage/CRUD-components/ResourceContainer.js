"use client";

import React, { useState, useContext } from "react";
import ResourceActions from "./ResourceActions";
import ResourceItem from "./ResourceItem";
import { ModalContext } from "../../context/SmallModalContext";

const ResourceContainer = ({
  createItem,
  deleteItem,
  itemLabel,
  itemValue,
  setItemValue,
  tableName,
  searchItem,
  searchMode,
}) => {
  const [selectedItemsForDelete, setSelectedItemsForDelete] = useState([]);
  const { openViewProduct } = useContext(ModalContext);

  return (
    <div className="w-full min-h-[500px] drop-shadow-2xl rounded-2xl p-10 flex flex-col justify-start items-center gap-10">
      {/* ACTIONS: CREATE + DELETE */}
      <ResourceActions
        createItem={createItem}
        deleteItem={deleteItem}
        tableName={tableName}
        itemValue={itemValue}
        setItemValue={setItemValue}
        selectedItemsForDelete={selectedItemsForDelete}
      />

      {/* ITEMs*/}
      <ResourceItem
        itemLabel={itemLabel}
        itemValue={itemValue}
        selectedItemsForDelete={selectedItemsForDelete}
        setSelectedItemsForDelete={setSelectedItemsForDelete}
        searchItem={searchItem}
        searchMode={searchMode}
        tableName={tableName}
        onViewProduct={tableName === "Produse" && openViewProduct 
          ? (product) => openViewProduct(product)
          : undefined}
        onModifyProduct={tableName === "Produse" ? (product) => {
          // This will be handled by ModifyButton
          console.log("Modify product:", product);
        } : undefined}
      />
    </div>
  );
};

export default ResourceContainer;
