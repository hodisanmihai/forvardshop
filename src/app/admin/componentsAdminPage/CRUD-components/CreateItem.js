"use client";

import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/SmallModalContext";
import CreateSmallItem from "./CreateSmallItem";
import CreateProductItem from "./CreateProductItem";

const CreateItem = ({ visible = false, onClose, tableName }) => {
  const { currentResource, createCallback } = useContext(ModalContext);
  const [inputValue, setInputValue] = useState("");

  console.log(currentResource);

  if (!visible) return null;

  const handleCreate = () => {
    if (!inputValue.trim()) {
      alert("Input-ul este gol");
      return;
    }
    if (createCallback) createCallback(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-screen min-h-screen bg-black/50 backdrop-blur-xs z-50 flex justify-center items-center">
      <div className="bg-blue-900 w-[40%] h-[30%] p-8 rounded flex flex-col gap-4 items-center">
        <div> {currentResource}</div>

        {currentResource === "Creeaza Produs" ? (
          <CreateProductItem
            inputValue={inputValue}
            createCallback={createCallback}
            setInputValue={setInputValue}
          />
        ) : (
          <CreateSmallItem
            inputValue={inputValue}
            createCallback={createCallback}
            setInputValue={setInputValue}
          />
        )}
        <div className="pt-10 w-[80%] flex justify-between">
          <button
            className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
            onClick={onClose}
          >
            Închide
          </button>
          <button
            className="bg-green-600 text-white p-2 rounded hover:bg-green-400"
            onClick={handleCreate}
          >
            Creează
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
