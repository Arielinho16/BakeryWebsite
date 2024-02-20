import React, { useContext } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";

export const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <div className="cart-container">
      <div>
        <div>Artículos: {quantity}</div>
        <div>Total: {totalPrice}₲</div>
        <button onClick={() => console.log(cart)}>Revisar</button>
      </div>
    </div>
  );
};