"use client";

import React from "react";
import ResourceViewToggle from "../componentsAdminPage/CRUD-components/ResourceViewToggle";
import ResourceContainer from "../componentsAdminPage/CRUD-components/ResourceContainer";

const page = () => {
  return (
    <div className="bg-gray-800 w-full h-screen p-10 flex flex-col justify-start items-center  gap-10  ">
      {/* Selector */}
      <ResourceViewToggle text1={"Toate Brand-urile"} text2={"Cauta Brand"} />

      {/* container  */}
      <ResourceContainer
        createItem={"Creeaza Brand"}
        deleteItem={"Sterge Brand"}
      />
    </div>
  );
};

export default page;
