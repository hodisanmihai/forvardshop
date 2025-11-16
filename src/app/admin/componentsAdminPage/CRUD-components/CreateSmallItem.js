"use client";

import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/SmallModalContext";
import { supabase } from "../../../../../lib/supabase";

const CreateSmallItem = ({ visible = false, onClose }) => {
  const { currentResource, createCallback } = useContext(ModalContext);
  const [inputValue, setInputValue] = useState("");

  if (!visible) return null;

  const handleCreate = () => {
    if (!inputValue.trim()) {
      alert("Input-ul este gol");
      return;
    } // dacă e gol sau doar spații, nu face nimic
    if (createCallback) createCallback(inputValue); // trimite valoarea către ResourceActions / page.js
    setInputValue(""); // curăță inputul
    onClose(); // închide modalul
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-xs z-50 flex justify-center items-center">
      <div className="bg-blue-900 w-[40%] h-[30%] p-8 rounded flex flex-col gap-4 items-center">
        <div> {currentResource}</div>
        <input
          type="text"
          className="w-[80%] h-[20%] bg-gray-800 text-center"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate(); // apelează funcția de creare când apeși Enter
            }
          }}
        />
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

export default CreateSmallItem;
