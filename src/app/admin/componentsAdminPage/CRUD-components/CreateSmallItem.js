"use client";

import { useContext, useState } from "react";
import React from "react";
import { ModalContext } from "../../context/SmallModalContext";

const CreateSmallItem = ({
  inputValue,
  createCallback,
  setInputValue,
  onClose,
}) => {
  const { currentResource, showSuccessNotification } = useContext(ModalContext);
  const fieldClassName = {
    name: inputValue,
  };

  const handleCreate = () => {
    if (!inputValue.trim()) {
      alert("Input-ul este gol");
      return;
    }
    if (createCallback) createCallback(fieldClassName);

    // Show succes notification
    if (currentResource && showSuccessNotification) {
      showSuccessNotification(currentResource);
    }

    setInputValue("");
    onClose();
  };

  return (
    <>
      <input
        type="text"
        placeholder="CREAZAA"
        className="w-[80%] h-10 bg-gray-800 text-center"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreate();
          }
        }}
      />
      <button
        className="bg-green-600 text-white p-2 rounded hover:bg-green-400"
        onClick={handleCreate}
      >
        Creează
      </button>
    </>
  );
};

export default CreateSmallItem;
