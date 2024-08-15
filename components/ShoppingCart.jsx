import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";

export const ShoppingCart = () => {
  const [cart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <div className="cart-container">
      <div>
        <div className="cart-title">Mi carrito: </div>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {cart.map((item, index) => (
          <div
            key={index}
            className="cart-box"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              maxWidth: "230px",
              maxHeight: "250px"
            }}
          >
            <h5>{item.name}</h5>
            <img
              src={item.imgUrl}
              alt={item.name}
              style={{ width: "140px", height: "140px", marginBottom: "10px" }}
            />
            <p>Cantidad: {item.quantity}</p>
          </div>
        ))}
        </div>

        <div className="cart-text"
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
          Cantidad de Productos:  {quantity}</div>
        <div className="cart-text"
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
          Total:  {totalPrice}₲</div>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
          <Link to="/menu" className="btn btn-success" id="buttonCarrito1">
            Volver
          </Link>
          {/* Utilizamos un operador ternario para renderizar el Link solo si el carrito no está vacío */}
          {quantity > 0 ? (
            <Link to="/checkout" className="btn btn-success" id="buttonCarrito2">
              Proceder al Pago
            </Link>
          ) : (
            <button className="btn btn-success disabled" disabled id="buttonCarrito2">
              Proceder al Pago
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

