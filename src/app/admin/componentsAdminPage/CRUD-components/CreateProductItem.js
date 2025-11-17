"use client";

import React from "react";

const CreateProductItem = ({ inputValue, createCallback, setInputValue }) => {
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
    <>
      <input
        type="text"
        placeholder="SA IMI BAG PL"
        className="w-[80%] h-8 bg-gray-800 text-center"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreate();
          }
        }}
      />
    </>
  );
};

export default CreateProductItem;
