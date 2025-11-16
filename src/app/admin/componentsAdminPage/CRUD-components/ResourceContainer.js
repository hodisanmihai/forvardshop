"use client";

import React, { useState } from "react";
import ResourceActions from "./ResourceActions";
import ResourceItem from "./ResourceItem";

const ResourceContainer = ({
  createItem,
  deleteItem,
  itemLabel,
  itemValue,
  setItemValue,
  tableName,
}) => {
  const [selectedItemsForDelete, setSelectedItemsForDelete] = useState([]);

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
      />
    </div>
  );
};

export default ResourceContainer;
