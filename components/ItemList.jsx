import React from "react";
import storeItems from "../data/products.json";
import { Item } from "./Item";

export const ItemList = ({ category }) => {
  console.log("storeItems:", storeItems);
  // Filtrar los productos basándose en la categoría para mostrarselos al cliente
  const filteredItems = storeItems.filter(product => product.category === category);
  
  console.log("filteredItems:", filteredItems);

  return (
    <div className="items-list">
      {filteredItems.map((product, idx) => {
        return <Item key={product.id} {...product} />;
      })}
    </div>
  );
};
