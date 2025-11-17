"use client";

import React, { useEffect } from "react";
import ResourceViewToggle from "../../componentsAdminPage/CRUD-components/ResourceViewToggle";
import ResourceContainer from "../../componentsAdminPage/CRUD-components/ResourceContainer";
import { supabase } from "../../../../../lib/supabase";
import { useState } from "react";

const Page = () => {
  const [searchMode, setsearchMode] = useState(false);
  const [searchItem, setSearcItem] = useState("");
  const [listIteme, setListIteme] = useState([]);

  // filtrare iteme

  const filteredList = searchMode
    ? listIteme.filter(
        (item) =>
          item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.id.toString() === searchItem
      )
    : listIteme;

  // fetch iteme

  useEffect(() => {
    const fetchIteme = async () => {
      const { data, error } = await supabase.from("Produse").select("*");
      if (error) console.log(error);
      else {
        console.log(data);
        setListIteme(data);
      }
    };

    fetchIteme();
  }, []);

  return (
    <div className="bg-gray-800 w-full min-h-screen p-10 flex flex-col justify-start items-center gap-10  ">
      {/* Selector */}
      <ResourceViewToggle
        text1={"Toate Produsele"}
        text2={"Cauta Produse"}
        searchMode={searchMode}
        setsearchMode={setsearchMode}
        setSearcItem={setSearcItem}
      />

      {/* container  */}
      <ResourceContainer
        createItem={"Creeaza Produs"}
        deleteItem={"Sterge Produs"}
        itemLabel={"Produse"}
        itemValue={filteredList}
        setItemValue={setListIteme}
        tableName="Produse"
        openCreate={() => setIsModalOpen(true)}
        searchItem={searchItem}
        searchMode={searchMode}
      />
    </div>
  );
};

export default Page;
