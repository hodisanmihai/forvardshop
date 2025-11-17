"use client";

import React from "react";
import { supabase } from "../../../../../lib/supabase";

const ResourceViewToggle = ({
  text1,
  text2,
  searchMode,
  setsearchMode,
  setSearcItem,
}) => {
  const handleSearch = function (e) {
    setSearcItem(e.target.value);
  };

  return (
    <div className=" bg-blue-900 p-2 rounded h-[10%] gap-10  flex flex-col justify-center drop-shadow-2xl">
      <div className="flex gap-10">
        <button
          className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer "
          onClick={() => setsearchMode(false)}
        >
          {text1}
        </button>
        <button
          className=" bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer  "
          onClick={() => setsearchMode(true)}
        >
          {text2}
        </button>
      </div>
      {searchMode ? (
        <div className="flex justify-center items-center ">
          <input
            type="text"
            className="w-[80%] h-[20%] bg-gray-800 text-center"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ResourceViewToggle;
