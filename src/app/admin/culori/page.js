"use client";

import React from "react";
import ResourceViewToggle from "../componentsAdminPage/CRUD-components/ResourceViewToggle";
import ResourceContainer from "../componentsAdminPage/CRUD-components/ResourceContainer";

const Page = () => {
  const listCulori = [
    "rosu",
    "verde",
    "galben",
    "rosu",
    "verde",
    "galben",
    "rosu",
    "verde",
    "galben",
    "rosu",
    "verde",
    "galben",
    "rosu",
    "verde",
    "galben",
  ];
  return (
    <div className="bg-gray-800 w-full min-h-screen p-10 flex flex-col justify-start items-center  gap-10  ">
      {/* Selector */}
      <ResourceViewToggle text1={"Toate Culorile"} text2={"Cauta Culori"} />

      {/* container  */}
      <ResourceContainer
        createItem={"Creeaza Culoare"}
        deleteItem={"Sterge Culoare"}
        itemLabel={"Culoare"}
        itemValue={listCulori}
      />
    </div>
  );
};

export default Page;
