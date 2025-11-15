"use client";

import React from "react";

const ResourceActions = ({ createItem, deleteItem }) => {
  return (
    <div className="bg-blue-900  gap-10 p-2 flex flex-row justify-evenly rounded drop-shadow-2xl">
      <button className="bg-blue-800  p-6 rounded hover:bg-blue-600 cursor-pointer  ">
        {createItem}
      </button>
      <button className=" bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer  ">
        {deleteItem}
      </button>
    </div>
  );
};

export default ResourceActions;
