"use client";

import React, { useEffect } from "react";
import ResourceViewToggle from "../componentsAdminPage/CRUD-components/ResourceViewToggle";
import ResourceContainer from "../componentsAdminPage/CRUD-components/ResourceContainer";
import { supabase } from "../../../../lib/supabase";
import { useState } from "react";

const Page = () => {
  const [listIteme, setListIteme] = useState([]);
  const fetchIteme = async () => {
    const { data, error } = await supabase.from("Culori").select("*");
    if (error) {
      console.log(error);
    } else {
      setListIteme(data);
    }
  };

  useEffect(() => {
    const fetchIteme = async () => {
      const { data, error } = await supabase.from("Culori").select("*");
      if (error) console.log(error);
      else setListIteme(data);
    };

    fetchIteme();
  }, []);

  console.log(listIteme);

  return (
    <div className="bg-gray-800 w-full min-h-screen p-10 flex flex-col justify-start items-center  gap-10  ">
      {/* Selector */}
      <ResourceViewToggle text1={"Toate Culorile"} text2={"Cauta Culori"} />

      {/* container  */}
      <ResourceContainer
        createItem={"Creeaza Culoare"}
        deleteItem={"Sterge Culoare"}
        itemLabel={"Culoare"}
        itemValue={listIteme}
        setItemValue={setListIteme}
        tableName="Culori"
        openCreate={() => setIsModalOpen(true)}
      />
    </div>
  );
};

export default Page;
