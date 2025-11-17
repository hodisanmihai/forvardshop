"use client";

import OpenCreateButton from "./CRUD-BUTTONS/OpenCreateButton";
import DelelteButton from "./CRUD-BUTTONS/DelelteButton";

const ResourceActions = ({
  createItem,
  deleteItem,
  itemValue,
  tableName,
  setItemValue,
  selectedItemsForDelete,
}) => {
  // 2. Ștergere iteme selectate

  return (
    <div className="bg-blue-900 gap-10 p-2 flex flex-row justify-evenly rounded drop-shadow-2xl">
      <OpenCreateButton
        createItem={createItem}
        itemValue={itemValue}
        setItemValue={setItemValue}
        tableName={tableName}
      />

      <DelelteButton
        selectedItemsForDelete={selectedItemsForDelete}
        deleteItem={deleteItem}
        tableName={tableName}
        itemValue={itemValue}
        setItemValue={setItemValue}
      />
    </div>
  );
};

export default ResourceActions;
