import React, { useContext } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";
import axios from "axios"; // Importa axios para hacer solicitudes HTTP

export const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );
  
  const handleProceedToCheckout = async () => {
    try {
      console.log("Cantidad de productos:", quantity);
      console.log("Precio total:", totalPrice);
      // Envía los valores de quantity y totalPrice al backend
      await axios.post("/api/checkout", { quantity, totalPrice });
  
      // Redirige al usuario a la página de checkout después de recibir la respuesta del backend
      window.location.href = "/checkout";
  
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
    }
  };

  const handleProceedToBack = () => {
    window.location.href = "/menu";

  }

  return (
    <div className="cart-container">
      <div>
        <div>Productos: {quantity}</div>
        <div>Total: {totalPrice}₲</div>
        <button onClick={handleProceedToBack}>Volver al Menú</button>
        <button onClick={handleProceedToCheckout}>Proceder al Pago</button>
      </div>
    </div>
  );
};
