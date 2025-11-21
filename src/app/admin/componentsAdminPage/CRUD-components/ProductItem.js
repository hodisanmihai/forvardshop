"use client";

import React, { useState } from "react";
import Image from "next/image";

const ProductItem = ({ product, isSelected, onSelect, onDoubleClick }) => {
  const [imageError, setImageError] = useState(false);

  // Get first image from images array
  let firstImage = null;
  if (product.images) {
    let imagesArray = [];
    if (Array.isArray(product.images)) {
      imagesArray = product.images;
    } else if (typeof product.images === "string") {
      // If it's a string, try to parse it as JSON
      try {
        const parsed = JSON.parse(product.images);
        imagesArray = Array.isArray(parsed) ? parsed : [];
      } catch {
        // If parsing fails, treat as single URL or empty
        imagesArray = product.images.trim() ? [product.images] : [];
      }
    }
    firstImage = imagesArray.length > 0 ? imagesArray[0] : null;
  }

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`w-[calc(50%-20px)] min-w-[300px] rounded-lg p-4 flex flex-col gap-3 cursor-pointer transition-all
        ${
          isSelected
            ? "bg-red-700 border-2 border-red-500"
            : "bg-blue-800 hover:bg-blue-700 border-2 border-transparent"
        }`}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
    >
      {/* Product Image */}
      {firstImage && !imageError ? (
        <div className="w-full h-48 bg-gray-700 rounded-lg overflow-hidden relative">
          {firstImage.startsWith("blob:") ? (
            // For blob URLs (preview), use regular img tag
            <Image
              src={firstImage}
              alt={product.name || "Product"}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              loading="eager"
            />
          ) : (
            // For external URLs (Supabase Storage), use Next.js Image
            <div className="relative w-full h-full">
              <Image
                src={firstImage}
                alt={product.name || "Product"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={false}
                loading="eager"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Product Code */}
      <div className="text-sm text-gray-300">
        <span className="font-semibold">Cod:</span>{" "}
        {product.product_code || "N/A"}
      </div>

      {/* Product Name */}
      <div className="text-lg font-semibold text-white line-clamp-2">
        {product.name || "Nume lipsă"}
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-1 text-xs text-gray-400">
        <div>
          <span className="font-semibold">Creat:</span>{" "}
          {formatDate(product.created_at)}
        </div>
        {product.updated_at && (
          <div>
            <span className="font-semibold">Actualizat:</span>{" "}
            {formatDate(product.updated_at)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
