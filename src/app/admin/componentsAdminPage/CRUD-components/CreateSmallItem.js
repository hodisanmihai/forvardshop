"use client";

import React, { useState } from "react";

const CreateSmallItem = ({ visible = false, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-xs z-50 flex justify-center items-center">
      <div className="bg-blue-900 w-[40%] h-[30%] p-8 rounded flex flex-col gap-4 items-center">
        <div>Creeaza </div>
        <input
          type="text"
          className="w-[80%] h-[20%] bg-gray-800 text-center "
        />
        <div className="pt-10 w-[80%] flex justify-between  ">
          <button
            className="bg-red-600 text-white p-2 rounded pointer hover:bg-red-500"
            onClick={onClose}
          >
            Inchide
          </button>
          <button
            className="bg-green-600 text-white p-2 rounded pointer hover:bg-green-400"
            onClick={onClose}
          >
            Creeaza
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSmallItem;
