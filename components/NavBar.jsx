import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";
import { FaShoppingCart } from "react-icons/fa"; // Importa el icono de carrito de React Icons
import { SlActionUndo } from "react-icons/sl";

export const NavBar = () => {
  const location = useLocation(); // Obtén la ubicación actual de la ruta
  const [cart, setCart] = useContext(CartContext);
  const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Estilos para el navbar
  const navStyles = {
    color: "#fff",
    listStyle: "none",
    textDecoration: "none",
  };

  // Estilos para el icono de carrito
  const cartIconStyles = {
    marginRight: "5px",
    fontSize: "30px",
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="navbar-left">
          <ul className="navbar-nav">
            {/* Renderizar el enlace "Volver" solo si no estamos en la ruta /menu */}
            {location.pathname !== "/menu" && (
              <li className="nav-item">
                <Link to={"/"} className="nav-link" style={navStyles}>
                  Volver 
                  <SlActionUndo style={cartIconStyles} />
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-right">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/cart"} className="nav-link" style={navStyles}>
                  <FaShoppingCart style={cartIconStyles} />
                  <span className="cart-count">{quantity}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
