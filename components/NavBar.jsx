import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";
import { FaShoppingCart } from "react-icons/fa"; // Importa el icono de carrito de React Icons


export const NavBar = () => {
  const location = useLocation(); // Obtén la ubicación actual de la ruta
  const [cart, setCart] = useContext(CartContext);
  const [showBackLink, setShowBackLink] = useState(true); // Estado para controlar la visibilidad del enlace "Volver"
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

  useEffect(() => {
    // Verifica si la ruta actual es /cart y nos muestra el boton Volver solo si estamos en el carrito
    setShowBackLink(location.pathname === "/cart");
  }, [location]);

  return (
    <nav id="navbar-React" className="navbar navbar-expand-lg">
      <div className="container-fluid">
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
