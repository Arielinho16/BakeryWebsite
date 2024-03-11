import React from "react";
import storeItems from "../data/products.json";
import { Item } from "./Item";
import { FaRegUser } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import { Link } from "react-router-dom";

export const ItemListforMenu = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          {/* Sidebar */}
          <div className="flex-shrink-0 p-3" style={{ width: "120px" }}>
            <ul className="list-unstyled ps-0">
              <div className="border-bottom">
                  <li className="mb-1">
                    <button id="sidebarTitle" className="btn btn-toggle d-inline-flex  rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                      Categorias
                      <CiCoffeeCup style={{ marginLeft: "3px",fontSize: "32px" }}/>
                    </button>
                    <div className="collapse" id="home-collapse">
                      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><Link to="/cafe" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Cafés</Link></li>
                        <li><Link to="/canasta" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Canastas</Link></li>
                        <li><Link to="/combos" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Combos</Link></li>
                        <li><Link to="/dulces" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Dulces</Link></li>
                        <li><Link to="/jugos" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Jugos</Link></li>
                        <li><Link to="/salados" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Salados</Link></li>
                        <li><Link to="/saludables" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Saludables</Link></li>
                        <li><Link to="/pasteles" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Pastelería</Link></li>
                      </ul>
                    </div>
                  </li>
              </div>
              <li className="mb-1">
                  <button id="sidebarTitle" className="btn btn-toggle d-inline-flex  rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                  Cuenta
                  <FaRegUser style={{ marginLeft: "3px", fontSize: "28px" }}/>
                  </button>
                  <div className="collapse" id="dashboard-collapse" >
                      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                        <li><a href="/user" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Registrarse</a></li>
                        <li><a href="/user" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Iniciar sesión</a></li>
                        <li><a href="/user" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Perfil</a></li>
                        <li><a href="/user" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Salir</a></li>
                      </ul>
                  </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          {/* List of Products */}
          <div className="items-list">
            {storeItems.map((product, idx) => {
              return <Item key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
