"use client";

import React from "react";
import { supabase } from "../../../../../lib/supabase";

const ResourceViewToggle = ({ text1, text2 }) => {
  return (
    <div className=" bg-blue-900 p-2 rounded h-[10%] gap-10  flex flex-row justify-center drop-shadow-2xl">
      <button className="bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer ">
        {text1}
      </button>
      <button className=" bg-blue-800 p-6 rounded hover:bg-blue-600 cursor-pointer  ">
        {text2}
      </button>
    </div>
  );
};

export default ResourceViewToggle;
