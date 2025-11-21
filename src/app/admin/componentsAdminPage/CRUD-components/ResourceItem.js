"use client";

import React, { useState } from "react";
import ProductItem from "./ProductItem";

const ResourceItem = ({
  itemLabel,
  itemValue,
  selectedItemsForDelete,
  setSelectedItemsForDelete,
  searchItem,
  searchMode,
  tableName,
  onViewProduct,
  onModifyProduct,
}) => {
  const itemsPerPage = tableName === "Produse" ? 10 : 15;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelect = (itemId) => {
    if (tableName === "Produse") {
      if (selectedItemsForDelete.includes(itemId)) {
        setSelectedItemsForDelete([]);
      } else {
        setSelectedItemsForDelete([itemId]);
      }
    } else {
      if (selectedItemsForDelete.includes(itemId)) {
        setSelectedItemsForDelete(
          selectedItemsForDelete.filter((id) => id !== itemId)
        );
      } else {
        setSelectedItemsForDelete([...selectedItemsForDelete, itemId]);
      }
    }
  };

  const handleDoubleClick = (item) => {
    if (tableName === "Produse" && onViewProduct) {
      onViewProduct(item);
    }
  };

  // paginare
  const totalPages = Math.ceil(itemValue.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = itemValue.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-blue-900 gap-10 p-10 w-full rounded-2xl drop-shadow-2xl flex flex-col">
      {/* Total iteme */}
      <div>Total: {itemValue.length || 0}</div>

      {/* Lista de iteme */}
      {paginatedItems.length === 0 ? (
        searchMode ? (
          <div>Nu s-au găsit rezultate pentru {searchItem}</div>
        ) : (
          <div>Nu există iteme în tabel</div>
        )
      ) : tableName === "Produse" ? (
        // Special layout for Produse: 2 columns
        <div className="w-full gap-4 flex flex-wrap justify-start">
          {paginatedItems.map((item) => (
            <ProductItem
              key={item.id}
              product={item}
              isSelected={selectedItemsForDelete.includes(item.id)}
              onSelect={() => handleSelect(item.id)}
              onDoubleClick={() => handleDoubleClick(item)}
            />
          ))}
        </div>
      ) : (
        // Default layout for other resources
        <div className="w-full gap-10 flex flex-wrap justify-start">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className={`min-w-[200px] flex-1 h-[200px] rounded p-5 flex flex-col justify-center items-center whitespace-nowrap overflow-hidden text-ellipsis
            ${
              selectedItemsForDelete.includes(item.id)
                ? "bg-red-700"
                : "bg-blue-800"
            } hover:bg-blue-700 gap-5`}
              onClick={() => handleSelect(item.id)}
            >
              <span>ID : {item.id}</span>
              <div className="flex gap-2 text-xl flex-col">
                <span>{itemLabel} :</span>
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginare */}
      {totalPages > 1 && (
        <div className="flex gap-4 mt-5 justify-center items-center">
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:hover:bg-gray-700 hover:bg-blue-600"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Inapoi
          </button>
          <span className="text-white">
            {currentPage} / {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:hover:bg-gray-700 hover:bg-blue-600  "
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Inainte
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourceItem;
