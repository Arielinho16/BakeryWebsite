import React from "react";
import { ItemList } from "./components/ItemList";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import { Layout } from "./components/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./components/Checkout";

// Agrega aquí tu clave pública de Stripe
const stripePromise = loadStripe("pk_test_51OmmqBK4P6Uiq4axZvTPwvHJhu5JIHJB9zufHtZ2WmuWRwJqUH8iHOf9hNFug4XYA4kOvcD2Jqjp3nMzEMOMUv88000vxGvHGn");

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
          {/* Utiliza Elements de Stripe para envolver el componente CheckoutForm */}
          <Route path="/checkout" element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          } />
        </Routes>
      </Router>
    </ShoppingCartProvider>
  );
};
