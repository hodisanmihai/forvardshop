"use client";

import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../../../../../lib/supabase";
import { ModalContext } from "../../context/SmallModalContext";
import Image from "next/image";

const CreateProductItem = ({
  createCallback,
  onClose,
  productData,
  isViewMode = false,
  setIsViewMode,
  modifyCallback,
}) => {
  const { currentResource, showSuccessNotification } = useContext(ModalContext);
  // State pentru fetch
  const [listaCulori, setListaCulori] = useState([]);
  const [listaCategorii, setListaCategorii] = useState([]);
  const [listaBrand, setListaBrand] = useState([]);
  const [listaDistribuitori, setListaDistribuitori] = useState([]);

  // State pentru input-uri
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [aqusitionPrice, setaqusitionPrice] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [keywordsInput, setKeywordsInput] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [longDesc, setLongDesc] = useState("");
  const [category, setCategory] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [brand, setBrand] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);
  const [colorInput, setColorInput] = useState("");
  const [color, setColor] = useState("");
  const [showColorSuggestions, setShowColorSuggestions] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [supplierInput, setSupplierInput] = useState("");
  const [showSupplierSuggestions, setShowSupplierSuggestions] = useState(false);
  const [weight, setWeight] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [productCode, setProductCode] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Tailwind common class pentru input
  const fieldClassName = `w-full px-4 py-2 text-gray-100 bg-gray-800 border border-gray-300 rounded-lg shadow-sm 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition mb-2`;

  const readOnlyClassName = isViewMode
    ? `${fieldClassName} opacity-75 cursor-not-allowed`
    : fieldClassName;

  const checkRequiredFields = () => {
    return (
      !name ||
      !shortDesc ||
      !category ||
      !color ||
      !supplier ||
      !price ||
      !aqusitionPrice ||
      !productCode
    );
  };

  // Calculate markup percentage
  const calculateMarkup = () => {
    if (!aqusitionPrice || !price || parseFloat(aqusitionPrice) === 0) {
      return 0;
    }
    const acquisition = parseFloat(aqusitionPrice);
    const selling = parseFloat(price);
    return ((selling - acquisition) / acquisition) * 100;
  };

  // Calculate price from acquisition price and markup percentage
  const calculatePriceFromMarkup = (markupPercent) => {
    if (!aqusitionPrice) return "";
    const acquisition = parseFloat(aqusitionPrice);
    const calculatedPrice = acquisition * (1 + markupPercent / 100);
    return calculatedPrice.toFixed(2);
  };

  const resetState = () => {
    setName("");
    setPrice("");
    setaqusitionPrice("");
    setShortDesc("");
    setLongDesc("");
    setCategory("");
    setCategoryInput("");
    setBrand("");
    setBrandInput("");
    setColorInput("");
    setColor("");
    setSupplier("");
    setSupplierInput("");
    setWeight("");
    setDimensions("");
    setProductCode("");
    setImages([]);
    setImageUrls([]);
    setKeywordsInput("");
    setKeywords([]);
  };

  // Check if product code already exists
  const checkProductCodeExists = async (code) => {
    const { data, error } = await supabase
      .from("Produse")
      .select("id, product_code")
      .eq("product_code", code)
      .maybeSingle();

    if (error) {
      console.error("Error checking product code:", error);
      return false;
    }

    return data !== null;
  };

  // Submit handler
  const handleCreate = async () => {
    if (checkRequiredFields()) {
      alert("Completează toate câmpurile obligatorii!");
      return;
    }

    const isUpdate = !!productData;

    // Check if product code already exists (only for new products or if code changed)
    if (!isUpdate || productData.product_code !== productCode) {
      const codeExists = await checkProductCodeExists(productCode);
      if (codeExists) {
        alert(
          "Exista deja un produs cu acest cod. Caută-l și încearcă să îl editezi."
        );
        return;
      }
    }

    setUploading(true);

    try {
      // Upload new images to Supabase Storage if there are any
      let uploadedImageUrls = [];
      if (images.length > 0) {
        uploadedImageUrls = await uploadImagesToStorage(images);
      }

      // Merge new images with existing ones if updating
      let finalImageUrls = uploadedImageUrls;
      if (isUpdate && productData.images) {
        let existingImages = [];
        if (Array.isArray(productData.images)) {
          existingImages = productData.images;
        } else if (typeof productData.images === "string") {
          // Parse JSON string if needed
          try {
            const parsed = JSON.parse(productData.images);
            existingImages = Array.isArray(parsed) ? parsed : [];
          } catch {
            existingImages = [];
          }
        }
        finalImageUrls = [...existingImages, ...uploadedImageUrls];
      }

      // Convert empty strings to null for name fields
      const colorName = color && color.trim() !== "" ? color : null;
      const supplierName = supplier && supplier.trim() !== "" ? supplier : null;
      const categoryName = category && category.trim() !== "" ? category : null;
      const brandName = brand && brand.trim() !== "" ? brand : null;

      const updatedProductData = {
        name: name,
        product_code: productCode,
        price: price,
        pret_achizitie: aqusitionPrice,
        minimum_order_required: minimumOrder,
        short_description: shortDesc,
        long_description: longDesc,
        keywords: keywords,
        color_id: colorName,
        supplier_id: supplierName,
        category_id: categoryName,
        brand_id: brandName,
        weight: weight,
        dimensions: dimensions,
        images: finalImageUrls,
      };

      if (isUpdate && modifyCallback) {
        // Update existing product
        await modifyCallback(productData.id, updatedProductData);
      } else if (createCallback) {
        // Create new product
        await createCallback(updatedProductData);
      }

      // Show success notification
      if (currentResource && showSuccessNotification) {
        const message = isUpdate
          ? `${currentResource} actualizat/a!`
          : `${currentResource} creat/a!`;
        showSuccessNotification(message);
      }

      // Reset state
      resetState();

      if (onClose) onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Eroare la salvarea produsului. Te rugăm să încerci din nou.");
    } finally {
      setUploading(false);
    }
  };

  // Image upload handler
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs for display
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls(previewUrls);
  };

  // Upload images to Supabase Storage
  const uploadImagesToStorage = async (files) => {
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${
        productCode || "product"
      }_${Date.now()}_${i}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from("ProductImages")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error);
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("ProductImages").getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  // Fetch liste
  useEffect(() => {
    const fetchCulori = async () => {
      const { data, error } = await supabase.from("Culori").select("name");
      if (error) {
        console.error("Error fetching Culori:", error);
      } else {
        setListaCulori(data.map((c) => c.name));
      }
    };
    fetchCulori();

    const fetchDistribuitori = async () => {
      const { data, error } = await supabase
        .from("Distribuitori")
        .select("name");
      if (error) {
        console.error("Error fetching Distribuitori:", error);
      } else {
        setListaDistribuitori(data.map((d) => d.name));
      }
    };
    fetchDistribuitori();

    const fetchBrand = async () => {
      const { data, error } = await supabase.from("Brands").select("name");
      if (error) {
        console.error("Error fetching Brands:", error);
      } else {
        setListaBrand(data.map((b) => b.name));
      }
    };
    fetchBrand();

    const fetchCategorii = async () => {
      const { data, error } = await supabase.from("Categorii").select("name");
      if (error) {
        console.error("Error fetching Categorii:", error);
      } else {
        setListaCategorii(data.map((cat) => cat.name));
      }
    };
    fetchCategorii();
  }, []);

  // Pre-fill form when productData is provided (for view/edit)
  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setProductCode(productData.product_code || "");
      setPrice(productData.price?.toString() || "");
      setaqusitionPrice(productData.pret_achizitie?.toString() || "");
      setMinimumOrder(productData.minimum_order_required?.toString() || "");
      setShortDesc(productData.short_description || "");
      setLongDesc(productData.long_description || productData.longDesc || "");
      // Ensure keywords is always an array
      const keywordsData = productData.keywords;
      if (Array.isArray(keywordsData)) {
        setKeywords(keywordsData);
      } else if (typeof keywordsData === "string") {
        // If it's a string, try to parse it or split by comma
        try {
          const parsed = JSON.parse(keywordsData);
          setKeywords(Array.isArray(parsed) ? parsed : []);
        } catch {
          setKeywords(
            keywordsData
              .split(",")
              .map((k) => k.trim())
              .filter(Boolean)
          );
        }
      } else {
        setKeywords([]);
      }
      setColor(productData.color_id || "");
      setSupplier(productData.supplier_id || "");
      setCategory(productData.category_id || "");
      setBrand(productData.brand_id || "");
      setWeight(productData.weight || "");
      setDimensions(productData.dimensions || "");

      // Set image URLs if they exist
      if (productData.images) {
        if (Array.isArray(productData.images)) {
          setImageUrls(productData.images);
        } else if (typeof productData.images === "string") {
          // If it's a string, try to parse it as JSON
          try {
            const parsed = JSON.parse(productData.images);
            setImageUrls(Array.isArray(parsed) ? parsed : []);
          } catch {
            // If parsing fails, treat as single URL or empty
            setImageUrls(productData.images.trim() ? [productData.images] : []);
          }
        } else {
          setImageUrls([]);
        }
      } else {
        setImageUrls([]);
      }
    }
  }, [productData]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  // Sync input fields with selected names
  useEffect(() => {
    setColorInput(color || "");
  }, [color]);

  useEffect(() => {
    setSupplierInput(supplier || "");
  }, [supplier]);

  useEffect(() => {
    setCategoryInput(category || "");
  }, [category]);

  useEffect(() => {
    setBrandInput(brand || "");
  }, [brand]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto p-4">
      {/* Nume */}
      <label>Nume produs</label>
      <textarea
        placeholder="Nume Produs"
        value={name}
        onChange={(e) => setName(e.target.value)}
        readOnly={isViewMode}
        disabled={isViewMode}
        className={`${readOnlyClassName} min-h-[50px] resize-y overflow-y-auto`}
      />

      {/* Cod produs */}
      <label>Cod produs</label>
      <input
        type="text"
        placeholder="Cod produs"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        className={readOnlyClassName}
        readOnly={isViewMode}
        disabled={isViewMode}
      />

      {/* Pret Achizitie */}
      <label>Pret Achizitie</label>
      <input
        type="number"
        min={0}
        step="0.01"
        placeholder="Pret Achizitie"
        value={aqusitionPrice}
        onChange={(e) => setaqusitionPrice(e.target.value)}
        className={readOnlyClassName}
        readOnly={isViewMode}
        disabled={isViewMode}
      />
      {/* Markup Percentage and Quick Buttons */}
      <label>Adaos Comercial</label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(50))
            }
            disabled={isViewMode}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            50%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(80))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            80%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(100))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            100%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(120))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            120%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(150))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            150%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(175))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            175%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(200))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            200%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(250))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            250%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(300))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            300%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(350))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            350%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(400))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            400%
          </button>
          <button
            type="button"
            onClick={() =>
              !isViewMode && setPrice(calculatePriceFromMarkup(500))
            }
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isViewMode}
          >
            500%
          </button>
        </div>
        {aqusitionPrice && price && (
          <div className="text-sm text-gray-300">
            Adaos: {calculateMarkup().toFixed(2)}%
          </div>
        )}
      </div>
      {/* Pret */}
      <label>Pret</label>
      <input
        type="number"
        placeholder="Pret"
        min={0}
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className={readOnlyClassName}
        readOnly={isViewMode}
        disabled={isViewMode}
      />
      {/* Cantitate minima de Comanda */}
      <label>Cantitate minima de Comanda </label>
      <input
        type="number"
        min={1}
        placeholder="Cantitate minima de Comanda"
        value={minimumOrder}
        onChange={(e) => setMinimumOrder(e.target.value)}
        className={readOnlyClassName}
        readOnly={isViewMode}
        disabled={isViewMode}
      />

      {/* Descriere scurta */}
      <label>Descriere scurta</label>
      <textarea
        placeholder="Descriere scurta"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        className={`${readOnlyClassName} min-h-[50px] resize-y overflow-y-auto`}
        readOnly={isViewMode}
        disabled={isViewMode}
      />

      {/* Descriere lunga */}
      <label>Descriere lunga</label>
      <textarea
        placeholder="Descriere lunga"
        value={longDesc}
        onChange={(e) => setLongDesc(e.target.value)}
        className={`${readOnlyClassName} min-h-[50px] resize-y overflow-y-auto`}
        readOnly={isViewMode}
        disabled={isViewMode}
      />
      {/* Keywords */}
      <label>Keywords</label>

      <input
        type="text"
        placeholder="Scrie un keyword și apasă ENTER"
        value={keywordsInput}
        onChange={(e) => setKeywordsInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (keywordsInput.trim() !== "") {
              setKeywords([...keywords, keywordsInput.trim()]);
              setKeywordsInput("");
            }
          }
        }}
        className={readOnlyClassName}
        readOnly={isViewMode}
        disabled={isViewMode}
      />
      <div className="flex flex-wrap gap-2 col-span-1 md:col-span-2">
        {Array.isArray(keywords) &&
          keywords.map((k, index) => (
            <span
              key={index}
              onClick={
                isViewMode
                  ? undefined
                  : () => setKeywords(keywords.filter((item) => item !== k))
              }
              className={`bg-gray-700 text-white px-3 py-1 rounded-full transition ${
                isViewMode
                  ? "cursor-default"
                  : "cursor-pointer hover:bg-red-600"
              }`}
            >
              {k} {!isViewMode && "✕"}
            </span>
          ))}
      </div>

      {/* Culoare */}
      <label>Culoare</label>
      <div className="relative">
        <input
          type="text"
          placeholder="Caută și selectează culoare"
          value={colorInput}
          onChange={(e) => {
            setColorInput(e.target.value);
            if (e.target.value === "") setColor("");
            setShowColorSuggestions(true);
          }}
          onFocus={() => setShowColorSuggestions(true)}
          onBlur={() => setTimeout(() => setShowColorSuggestions(false), 200)}
          className={readOnlyClassName}
          readOnly={isViewMode}
          disabled={isViewMode}
        />
        {showColorSuggestions && !isViewMode && (
          <div className="absolute z-10 w-full bg-gray-800 border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {listaCulori
              .filter((c) => c.toLowerCase().includes(colorInput.toLowerCase()))
              .map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setColor(c);
                    setColorInput(c);
                    setShowColorSuggestions(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-100 ${
                    color === c ? "bg-gray-700" : ""
                  }`}
                >
                  {c}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Distribuitor */}
      <label>Distribuitor</label>
      <div className="relative">
        <input
          type="text"
          placeholder="Caută și selectează distribuitor"
          value={supplierInput}
          onChange={(e) => {
            setSupplierInput(e.target.value);
            if (e.target.value === "") setSupplier("");
            setShowSupplierSuggestions(true);
          }}
          onFocus={() => setShowSupplierSuggestions(true)}
          onBlur={() =>
            setTimeout(() => setShowSupplierSuggestions(false), 200)
          }
          className={readOnlyClassName}
          readOnly={isViewMode}
          disabled={isViewMode}
        />
        {showSupplierSuggestions && (
          <div className="absolute z-10 w-full bg-gray-800 border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {listaDistribuitori
              .filter((d) =>
                d.toLowerCase().includes(supplierInput.toLowerCase())
              )
              .map((d, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSupplier(d);
                    setSupplierInput(d);
                    setShowSupplierSuggestions(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-100 ${
                    supplier === d ? "bg-gray-700" : ""
                  }`}
                >
                  {d}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Categorie */}
      <label>Categorie</label>
      <div className="relative">
        <input
          type="text"
          placeholder="Caută și selectează categorie"
          value={categoryInput}
          onChange={(e) => {
            setCategoryInput(e.target.value);
            if (e.target.value === "") setCategory("");
            setShowCategorySuggestions(true);
          }}
          onFocus={() => setShowCategorySuggestions(true)}
          onBlur={() =>
            setTimeout(() => setShowCategorySuggestions(false), 200)
          }
          className={readOnlyClassName}
          readOnly={isViewMode}
          disabled={isViewMode}
        />
        {showCategorySuggestions && (
          <div className="absolute z-10 w-full bg-gray-800 border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {listaCategorii
              .filter((d) =>
                d.toLowerCase().includes(categoryInput.toLowerCase())
              )
              .map((d, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCategory(d);
                    setCategoryInput(d);
                    setShowCategorySuggestions(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-100 ${
                    category === d ? "bg-gray-700" : ""
                  }`}
                >
                  {d}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <label>Brand</label>
      <div className="relative">
        <input
          type="text"
          placeholder="Caută și selectează brand"
          value={brandInput}
          onChange={(e) => {
            setBrandInput(e.target.value);
            if (e.target.value === "") setBrand("");
            setShowBrandSuggestions(true);
          }}
          onFocus={() => setShowBrandSuggestions(true)}
          onBlur={() => setTimeout(() => setShowBrandSuggestions(false), 200)}
          className={readOnlyClassName}
          readOnly={isViewMode}
          disabled={isViewMode}
        />
        {showBrandSuggestions && (
          <div className="absolute z-10 w-full bg-gray-800 border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {listaBrand
              .filter((b) => b.toLowerCase().includes(brandInput.toLowerCase()))
              .map((b, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setBrand(b);
                    setBrandInput(b);
                    setShowBrandSuggestions(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-100 ${
                    brand === b ? "bg-gray-700" : ""
                  }`}
                >
                  {b}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Greutate */}
      <label>Greutate</label>
      <input
        type="text"
        placeholder="Greutate"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className={readOnlyClassName}
        readOnly={isViewMode}
        disabled={isViewMode}
      />

      {/* Dimensiune */}
      <label>Dimensiune</label>
      <input
        type="text"
        placeholder="Dimensiune"
        value={dimensions}
        onChange={(e) => setDimensions(e.target.value)}
        className={readOnlyClassName}
        readOnly={isViewMode}
        disabled={isViewMode}
      />

      {/* Poze */}
      <label>Poze</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImagesChange}
        className={`${readOnlyClassName} col-span-1 md:col-span-2`}
        disabled={isViewMode || uploading}
      />
      {/* Image Previews */}
      {imageUrls.length > 0 && (
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="relative">
              {url.startsWith("blob:") ? (
                <Image
                  width={300}
                  height={128}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-300"
                />
              ) : (
                <Image
                  width={300}
                  height={128}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  unoptimized={false}
                />
              )}
              <button
                type="button"
                onClick={() => {
                  const newImages = images.filter((_, i) => i !== index);
                  const newUrls = imageUrls.filter((_, i) => i !== index);
                  setImages(newImages);
                  setImageUrls(newUrls);
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition"
                disabled={uploading}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Buton Submit */}
      {!isViewMode && (
        <button
          onClick={handleCreate}
          disabled={uploading}
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {uploading
            ? "Se încarcă..."
            : productData
            ? "Actualizează Produs"
            : "Creeaza Produs"}
        </button>
      )}
    </div>
  );
};

export default CreateProductItem;
