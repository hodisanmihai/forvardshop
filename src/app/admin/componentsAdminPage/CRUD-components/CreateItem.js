"use client";

import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/SmallModalContext";
import CreateSmallItem from "./CreateSmallItem";
import CreateProductItem from "./CreateProductItem";

const CreateItem = ({ visible = false, onClose, tableName }) => {
  const {
    currentResource,
    createCallback,
    viewProduct,
    modifyProduct,
    modifyCallback,
    isViewMode,
    setIsViewMode,
  } = useContext(ModalContext);
  const [inputValue, setInputValue] = useState("");

  console.log(currentResource);

  if (!visible) return null;

  const productData = viewProduct || modifyProduct;

  return (
    <div className="fixed inset-0 top-0 left-0 w-screen overscroll-y-auto bg-black/50 backdrop-blur-xs z-50 flex justify-center items-center  ">
      <div className="bg-blue-900 w-[60%] max-h-screen p-2 rounded flex flex-col gap-4 items-center">
        <div className="mt-4">
          {currentResource}
          {isViewMode && " (Vizualizare)"}
          {modifyProduct && !isViewMode && " (Modificare)"}
        </div>

        {currentResource === "Produse" ? (
          <CreateProductItem
            inputValue={inputValue}
            createCallback={createCallback}
            setInputValue={setInputValue}
            onClose={onClose}
            productData={productData}
            isViewMode={isViewMode}
            setIsViewMode={setIsViewMode}
            modifyCallback={modifyCallback}
          />
        ) : (
          <CreateSmallItem
            inputValue={inputValue}
            createCallback={createCallback}
            setInputValue={setInputValue}
            onClose={onClose}
          />
        )}
        <div className="pt-6 w-[80%] flex justify-between">
          {isViewMode && (
            <button
              className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500"
              onClick={() => setIsViewMode(false)}
            >
              Modifică
            </button>
          )}
          <button
            className="bg-red-600 text-white p-2 rounded hover:bg-red-500"
            onClick={onClose}
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
