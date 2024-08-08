import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para vaciar el carrito
  const emptyCart = () => {
    console.log("Vaciando carrito!!");
    setCart([]);
  };

  return (
    <CartContext.Provider value={[cart, setCart, emptyCart]}>
      {children}
    </CartContext.Provider>
  );
};
