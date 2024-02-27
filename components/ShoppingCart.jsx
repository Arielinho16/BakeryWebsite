import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";
import axios from 'axios';

export const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => acc + curr.quantity,  0);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  const productNamesAndQuantities = cart.map(item => `${item.name}: ${item.quantity}`).join(', ');

  const handleProceedToCheckout = async () => {
    try {
      // Envía los valores de quantity, totalPrice y los nombres de los productos al backend
      await axios.post('/CheckoutForm', { quantity, totalPrice, productNamesAndQuantities });
   
      // Redirige al usuario a la página de checkout después de recibir la respuesta del backend
      window.location.href = "/checkout";
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
    }
  };


  return (
    <div className="cart-container">
      <div>
        <div className="cart-title">Mi carrito: </div>
          
        {cart.map((item, index) => (
          <div key={index} className="cart-box">
            <div className="name-box">{item.name}</div>
            <div className="item-quantity">{item.quantity}</div>
            <img src={item.imgUrl} width="120" height="100" alt={item.name} />  
          </div>
        ))};
        
        <div className="cart-text">Cantidad de Productos: {quantity}</div>
        <div className="cart-text">Total: {totalPrice}₲</div>
          <Link to="/menu" className="btn btn-success">
            Volver
          </Link>
          {/* Reemplaza el botón con un componente Link que apunte a la ruta /checkout */}
          <Link to="/checkout" className="btn btn-success" onClick={handleProceedToCheckout}>
            Proceder al Pago
          </Link>
      </div>
    </div>
  );
};



