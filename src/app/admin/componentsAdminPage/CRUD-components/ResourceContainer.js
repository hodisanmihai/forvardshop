"use client";

import React from "react";
import ResourceActions from "./ResourceActions";
import ResourceItem from "./ResourceItem";

const ResourceContainer = ({
  createItem,
  deleteItem,
  itemLabel,
  itemValue,
}) => {
  return (
    <div className="w-full min-h-[500px] drop-shadow-2xl rounded-2xl  p-10 flex flex-col justify-start items-center  gap-10 ">
      {/* CRUD */}
      <ResourceActions createItem={createItem} deleteItem={deleteItem} />
      {/* ITEM CONTAINER */}
      <ResourceItem itemLabel={itemLabel} itemValue={itemValue} />
    </div>
  );
};

export default ResourceContainer;
