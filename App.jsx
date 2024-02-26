import React from "react";
import { ItemList } from "./components/ItemList";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCart} from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import {Layout} from "./components/Layout";


export const App = () => {
  return (
    <ShoppingCartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemList category="inicio" />} />
          <Route path="/menu" element={<ItemList category="menu" />} />
          <Route path="/dulces" element={<Layout title="Cafés"><ItemList category="dulces" /></Layout>} />
          <Route path="/cafe" element={<Layout title="Cafés"><ItemList category="cafe" /></Layout>} />
          <Route path="/canasta" element={<Layout title="Cafés"><ItemList category="canasta" /></Layout>} />
          <Route path="/combos" element={<ItemList category="combos" />} />
          <Route path="/jugos" element={<ItemList category="jugos" />} />
          <Route path="/salados" element={<ItemList category="salados" />} />
          <Route path="/pasteles" element={<Layout title="Cafés"><ItemList category="pasteles" /></Layout>} />
          <Route path="/saludables" element={<ItemList category="saludables" />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout"/>
        </Routes>
      </Router>
    </ShoppingCartProvider>
  );
};
