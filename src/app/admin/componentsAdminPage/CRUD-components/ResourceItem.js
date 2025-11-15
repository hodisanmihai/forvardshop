"use client";

import React from "react";

const ResourceItem = ({ itemLabel, itemValue }) => {
  return (
    <div className="bg-blue-900 gap-10 p-10 w-full rounded-2xl drop-shadow-2xl flex flex-wrap justify-start">
      {/* Item Box */}
      {/* Show total items */}
      <div className=""> Total: {itemValue.length || 0}</div>
      {/* item list */}
      <div className="w-full  gap-10 flex flex-wrap justify-start">
        {itemValue.map((item, index) => (
          <div
            key={index}
            className="min-w-[200px] flex-1 h-[200px] bg-blue-800 rounded-2xl p-5 hover:bg-blue-700 gap-5 flex flex-col justify-center items-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <span>ID : {index + 1}</span>
            <div className="flex gap-2 text-xl flex-col">
              <span>{itemLabel} :</span>
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceItem;
