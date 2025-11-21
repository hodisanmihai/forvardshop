"use client";

import OpenCreateButton from "./CRUD-BUTTONS/OpenCreateButton";
import DelelteButton from "./CRUD-BUTTONS/DelelteButton";
import ViewButton from "./CRUD-BUTTONS/ViewButton";
import ModifyButton from "./CRUD-BUTTONS/ModifyButton";

const ResourceActions = ({
  createItem,
  deleteItem,
  itemValue,
  tableName,
  setItemValue,
  selectedItemsForDelete,
}) => {
  return (
    <div className="bg-blue-900 gap-10 p-2 flex flex-row justify-evenly rounded drop-shadow-2xl">
      <OpenCreateButton
        createItem={createItem}
        itemValue={itemValue}
        setItemValue={setItemValue}
        tableName={tableName}
      />

      {tableName === "Produse" && (
        <>
          <ViewButton
            selectedItemsForDelete={selectedItemsForDelete}
            itemValue={itemValue}
            tableName={tableName}
          />
          <ModifyButton
            selectedItemsForDelete={selectedItemsForDelete}
            itemValue={itemValue}
            tableName={tableName}
            setItemValue={setItemValue}
          />
        </>
      )}

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
