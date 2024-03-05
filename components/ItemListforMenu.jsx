import React from "react";
import storeItems from "../data/products.json";
import { Item } from "./Item";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { CiCoffeeCup } from "react-icons/ci";


export const ItemListforMenu = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          {/* Sidebar */}
          <div className="flex-shrink-0 p-3" style={{ width: "200px" }}>
            <ul className="list-unstyled ps-0">
              <li className="mb-1">
                <button id="sidebarTitle" className="btn btn-toggle d-inline-flex  rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                  Categorias
                  <CiCoffeeCup style={{ marginLeft: "5px",fontSize: "32px" }}/>
                </button>
                <div className="collapse" id="home-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    <li><a href="/cafe" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Cafés</a></li>
                    <li><a href="/canasta" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Canastas</a></li>
                    <li><a href="/combos" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Combos</a></li>
                    <li><a href="/dulces" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Dulces</a></li>
                    <li><a href="/jugos" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText" >Jugos</a></li>
                    <li><a href="/salados" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Salados</a></li>
                    <li><a href="/saludables" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Saludables</a></li>
                    <li><a href="/pasteles" className="link-body-emphasis d-inline-flex text-decoration-none rounded sidebarText">Pastelería</a></li>
                  </ul>
                </div>
              </li>
              <li className="mb-1">
              <Link to = "/cart" id="sidebarTitle" type="button" className="btn btn-toggle d-inline-flex  rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                  Pedidos
                  <TiShoppingCart style={{marginLeft: "5px", fontSize: "28px" }}/>
              </Link>
              </li>
              <li className="border-top my-3" style={{ display: "block" }}></li>
              <li className="mb-1">
                  <button id="sidebarTitle" className="btn btn-toggle d-inline-flex  rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                  Cuenta
                      <FaRegUser style={{ marginLeft: "5px", fontSize: "28px" }}/>
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
