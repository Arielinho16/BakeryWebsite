import React from "react";
import { ItemList } from "./components/ItemList";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCart} from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";


export const App = () => {
  return (
    <ShoppingCartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemList category="inicio" />} />
          <Route path="/menu" element={<ItemList category="menu" />} />
          <Route path="/dulces" element={<ItemList category="dulces" />} />
          <Route path="/cafe" element={<ItemList category="cafe" />} />
          <Route path="/canasta" element={<ItemList category="canasta" />} />
          <Route path="/combos" element={<ItemList category="combos" />} />
          <Route path="/jugos" element={<ItemList category="jugos" />} />
          <Route path="/salados" element={<ItemList category="salados" />} />
          <Route path="/pasteles" element={<ItemList category="pasteles" />} />
          <Route path="/saludables" element={<ItemList category="saludables" />} />
          <Route path="/cart" element={<ShoppingCart />} />
           
        </Routes>
      </Router>
    </ShoppingCartProvider>
  );
};
