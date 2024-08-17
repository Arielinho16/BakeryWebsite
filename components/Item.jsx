import React, { useContext } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";

export const Item = ({ name, price, id, imgUrl }) => {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, quantity:  1, price, name, imgUrl }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const getQuantityById = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);

  return (
    <div className="item-box">
      {quantityPerItem > 0 && (
        <div className="item-quantity">{quantityPerItem}</div>
      )}

      <div className="name-box">{name}</div>
      <img src={imgUrl} width="180" height="180" />
      <div className="item-price">{price}Gs.</div>

      {quantityPerItem === 0 ? (
        <button className="item-add-button" onClick={() => addToCart()}>
          Añadir al carrito
        </button>
      ) : (
          <button className="item-plus-button" style={{ width: "28px", height: "28px" }} onClick={() => addToCart()}>
          + 
        </button>
      )}

      {quantityPerItem > 0 && (
        <button className="item-minus-button" style={{ width: "28px", height: "28px" }} onClick={() => removeItem(id)}>
          -
        </button>
      )}
    </div>
  );
};