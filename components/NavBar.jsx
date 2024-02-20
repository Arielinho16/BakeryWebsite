import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";
import { FaShoppingCart } from "react-icons/fa"; // Importa el icono de carrito de React Icons

export const NavBar = () => {
  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  // Estilos para el navbar
  const navStyles = {
    color: "#fff",
    listStyle: "none",
    textDecoration: "none",
  };

  // Estilos para el icono de carrito
  const cartIconStyles = {
    marginRight: "5px",
    fontSize: "24px",
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Robina's
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/menu"}>
                Menú
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/nosotros"}>
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/contacto"}>
                Contacto
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/cart"} className="nav-link" style={navStyles}>
                <FaShoppingCart style={cartIconStyles} />
                Carrito: <span className="cart-count">{quantity}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
