import React from "react";
import { ItemList } from "./components/ItemList";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ShoppingCart } from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import { Layout } from "./components/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./components/Checkout";
import { ItemListforMenu } from "./components/ItemListforMenu";
import { Index } from "./components/inicio";
import { Informacion } from "./components/nosotros";
import { Empresa } from "./components/empresa";
import { Contrato } from "./components/contratacion";
import { Local } from "./components/locales";

// Agrega aquí tu clave pública de Stripe
const stripePromise = loadStripe("pk_test_51OmmqBK4P6Uiq4axZvTPwvHJhu5JIHJB9zufHtZ2WmuWRwJqUH8iHOf9hNFug4XYA4kOvcD2Jqjp3nMzEMOMUv88000vxGvHGn");

export const App = () => {
  return (
    <ShoppingCartProvider>
      <Router>
        <NavBarControlled />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/nosotros" element={<Informacion />} />
          <Route exact path="/empresa" element={<Empresa />} />
          <Route exact path="/contratacion" element={<Contrato />} />
          <Route exact path="/locales" element={<Local />} />
          <Route path="/user" element={<ItemList category="usuario" />} />
          <Route path="/menu" element={<Layout title="Menú"><ItemListforMenu category="menu" /> </Layout>} />
          <Route path="/dulces" element={<Layout title="Dulces"><ItemList category="dulces" /> </Layout>} />
          <Route path="/cafe" element={<Layout title="Cafés"><ItemList category="cafe" /></Layout>} />
          <Route path="/canasta" element={<Layout title="Canastas"><ItemList category="canasta" /></Layout>} />
          <Route path="/combos" element={<Layout title="Combos"><ItemList category="combos" /></Layout>} />
          <Route path="/jugos" element={<Layout title="Jugos Naturales"><ItemList category="jugos" /></Layout>} />
          <Route path="/salados" element={<Layout title="Salados"><ItemList category="salados" /></Layout>} />
          <Route path="/pasteles" element={<Layout title="Pasteleria"><ItemList category="pasteles" /></Layout>} />
          <Route path="/saludables" element={<Layout title="Platos saludables"><ItemList category="saludables" /></Layout>} />
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

// Componente para controlar la visualización del NavBar
const NavBarControlled = () => {
  const location = useLocation();

  // Ocultar el NavBar en la ruta de checkout
  if (location.pathname === '/checkout' || location.pathname === '/' || location.pathname === '/contratacion' ||
    location.pathname === '/empresa' || location.pathname === '/nosotros' || location.pathname === '/locales') 
    return null;

  return <NavBar />;
};