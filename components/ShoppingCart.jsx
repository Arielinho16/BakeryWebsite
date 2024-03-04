import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";

export const ShoppingCart = () => {
  const [cart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => acc + curr.quantity,  0);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

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
        ))}
        
        <div className="cart-text">Cantidad de Productos: {quantity}</div>
        <div className="cart-text">Total: {totalPrice}₲</div>
        <Link to="/menu" className="btn btn-success" id="buttonCarrito1">
          Volver
        </Link>
        {/* No es necesario manejar el evento onClick aquí */}
        <Link to="/checkout" className="btn btn-success" id="buttonCarrito2">
          Proceder al Pago
        </Link>
      </div>
    </div>
  );
};
