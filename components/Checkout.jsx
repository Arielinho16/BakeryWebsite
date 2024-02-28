import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CartContext } from "../contexts/ShoppingCartContext";
import axios from "axios";



export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0); //Cantidad de items del carrito
  const totalPrice = cart.reduce(
    //Precio Total de el carrito
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  const totalPriceinBRLcents = Math.round(((totalPrice / 1.480).toFixed(2))*100); //pasamos a centavos de real


  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: totalPriceinBRLcents, // Envía el precio total en lugar del objeto { totalPrice }
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Product Information */}
      {cart.map((item, index) => (
        <div key={index}>
          <img
            src={item.imgUrl}
            alt={item.name}
            className="img-fluid"
            width="120"
            height="100"
          />
          <div className="text-center my-2">
            {item.name}: {item.quantity} x {item.price}Gs.
          </div>
        </div>
      ))}
      <h3 className="text-center my-2">Precio Total: {totalPrice}Gs.</h3>

      {/* User Card Input */}
      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe} className="btn btn-success">
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Pagar"
        )}
      </button>
    </form>
  );
};


