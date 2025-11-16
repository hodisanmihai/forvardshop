"use client";

import React, { useEffect } from "react";
import ResourceViewToggle from "../componentsAdminPage/CRUD-components/ResourceViewToggle";
import ResourceContainer from "../componentsAdminPage/CRUD-components/ResourceContainer";
import { supabase } from "../../../../lib/supabase";
import { useState } from "react";

const Page = () => {
  const [listIteme, setListIteme] = useState([]);
  const fetchIteme = async () => {
    const { data, error } = await supabase.from("Categorii").select("*");
    if (error) {
      console.log(error);
    } else {
      setListIteme(data);
    }
  };

  useEffect(() => {
    const fetchIteme = async () => {
      const { data, error } = await supabase.from("Categorii").select("*");
      if (error) console.log(error);
      else setListIteme(data);
    };

    fetchIteme();
  }, []);

  console.log(listIteme);

  return (
    <div className="bg-gray-800 w-full min-h-screen p-10 flex flex-col justify-start items-center  gap-10  ">
      {/* Selector */}
      <ResourceViewToggle
        text1={"Toate Categoriile"}
        text2={"Cauta Categorie"}
      />

      {/* container  */}
      <ResourceContainer
        createItem={"Creeaza Categorie"}
        deleteItem={"Sterge Categorie"}
        itemLabel={"Categorie"}
        itemValue={listIteme}
        setItemValue={setListIteme}
        tableName="Categorii"
        openCreate={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default Page;
