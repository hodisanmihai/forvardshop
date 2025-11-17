"use client";

import React, { useEffect } from "react";
import ResourceViewToggle from "../componentsAdminPage/CRUD-components/ResourceViewToggle";
import ResourceContainer from "../componentsAdminPage/CRUD-components/ResourceContainer";
import { supabase } from "../../../../lib/supabase";
import { useState } from "react";

const Page = () => {
  const [searchMode, setsearchMode] = useState(false);
  const [searchItem, setSearcItem] = useState("");
  const [listIteme, setListIteme] = useState([]);

  // filtrare iteme

  const filteredList = searchMode
    ? listIteme.filter((item) =>
        item.name.toLowerCase().includes(searchItem.toLowerCase())
      )
    : listIteme;

  // fetch

  useEffect(() => {
    const fetchIteme = async () => {
      const { data, error } = await supabase.from("Distribuitori").select("*");
      if (error) console.log(error);
      else setListIteme(data);
    };

    fetchIteme();
  }, []);

  return (
    <div className="bg-gray-800 w-full min-h-screen p-10 flex flex-col justify-start items-center  gap-10  ">
      {/* Selector */}
      <ResourceViewToggle
        text1={"Toti Distribuitorii"}
        text2={"Cauta Distribuitor"}
        searchMode={searchMode}
        setsearchMode={setsearchMode}
        setSearcItem={setSearcItem}
      />

      {/* container  */}
      <ResourceContainer
        createItem={"Creeaza Distribuitor"}
        deleteItem={"Sterge Distribuitor"}
        itemLabel={"Distribuitor"}
        itemValue={filteredList}
        setItemValue={setListIteme}
        tableName="Distribuitori"
        openCreate={() => setIsModalOpen(true)}
        searchItem={searchItem}
        searchMode={searchMode}
      />
    </div>
  );
};

export default Page;
