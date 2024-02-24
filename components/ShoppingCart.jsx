import React, { useState, useContext } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";
import CheckoutForm from "./CheckoutForm";

export const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // Definir showCheckoutForm como una variable de estado

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  const handleProceedToCheckout = () => {
    // Aquí puedes manejar la lógica para proceder al pago, 
    // como mostrar el formulario de pago, abrir un modal, etc.
    // Puedes usar un estado local para mostrar/ocultar el formulario.
    // Por ejemplo:
    setShowCheckoutForm(true);
  };

  return (
    <div className="cart-container">
      <div>
        <div>Artículos: {quantity}</div>
        <div>Total: {totalPrice}₲</div>
        <button onClick={handleProceedToCheckout}>Proceder al Pago</button>
      </div>
      {showCheckoutForm && <CheckoutForm totalPrice={totalPrice} />}
    </div>
  );
};
