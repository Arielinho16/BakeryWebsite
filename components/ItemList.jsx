import React from "react";
import storeItems from "../data/products.json";
import { Item } from "./Item";

export const ItemList = ({ category }) => {
  // Filtrar los productos basándose en la categoría
  const filteredItems = storeItems.filter(product => product.category === category);

  return (
    <div className="items-list">
      {filteredItems.map((product, idx) => {
        return <Item key={product.id} {...product} />;
      })}
    </div>
  );
};
