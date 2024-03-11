import React, { useState, useContext, useEffect } from "react";
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { CartContext } from "../contexts/ShoppingCartContext";
import { Link } from "react-router-dom";
import axios from "axios";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cart] = useContext(CartContext);
  const [selectedState,setState] = useState('');
  const [cities,setCities] = useState([]);
  const [promotionalCode,setPromotionalCode] = useState('');
  const [usedPromotionalCode,setUsedPromotionalCode] = useState([]);
  const [errorCodeProm,setErrorCodeProm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [loading, setLoading] = useState(false);
 

 

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px", // Ajusta el tamaño de la fuente según sea necesario
        fontFamily: '"Open Sans", sans-serif', // Cambia la fuente según sea necesario
        padding: "20px", // Ajusta el relleno según sea necesario
        color: "#000800", // Cambia el color del texto según sea necesario
        backgroundColor: "#ffffff", // Establece el color de fondo del elemento de tarjeta a blanco
        "::placeholder": {
        color: "#6c757d"
        }
      }
    }
  };

  const calcTotalPrice = cart.reduce((acc, curr) => acc + curr.quantity * curr.price,0);  //Seteamos el Precio Total de el carrito
  const [totalPrice,setTotalPrice] = useState(calcTotalPrice);

  const quantity = cart.reduce((acc, curr) => acc + curr.quantity, 0); //Cantidad de items del carrito


  const calcTotalPriceinBRLcents = (Math.round(((totalPrice / 1.480).toFixed(2))*100)); //pasamos a centavos de real para el Stripe mediante un set tambien
  const [totalPriceinBRLcents,setTotalPriceinBRLcents] = useState(calcTotalPriceinBRLcents);

  const codigosPromocionalesRobinas = ['APSA1210','VACC2810','CRVM1302','LAMC1234'];


  const handlePromotionalCode = (e) => {

    e.preventDefault();
    const codeProm = promotionalCode;

    if(!usedPromotionalCode.includes(codeProm)){

      if(codigosPromocionalesRobinas.includes(codeProm)){  // si el usuario nos ingresa un codigo promocional valido de la lista de codigos
        
        console.log("Codigo Valido");
        const descuento = totalPrice * 0.05;
        const newPrice = totalPrice - descuento;   // va a pagar con 5% de descuento sobre su total
        setTotalPrice(newPrice);
        setTotalPriceinBRLcents(Math.round(((newPrice / 1.480).toFixed(2))*100));
        setUsedPromotionalCode(...usedPromotionalCode,codeProm); //actualizamos la lista de codigos usados con el nuevo codigo ya usado

      }else{
        console.log("Código promocional inválido");
        setErrorCodeProm('Código promocional inválido');
      }
    } else {
      console.log('Código promocional ya utilizado');
      setErrorCodeProm('Código promocional ya utilizado');

    } 

  };
  
  const handleStateChange = (e) => {

    const state = e.target.value;
    setState(state);
    // Aquí podrías definir tus propias reglas para cargar las ciudades
    // según el estado seleccionado
    if (state === 'Central') {
      setCities(['Asunción', 'San Lorenzo', 'Luque','Fernando de la Mora', 'Villa Elisa', 'Ñemby','Capiata']);
    } else if (state === 'Alto Parana') {
      setCities(['Ciudad del Este', 'Hernandarias', 'Presidente Franco']);
    } else if (state === 'Itapua'){
      setCities(['Encarnacion']);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar campos específicos
   
    const nombre = document.getElementById('firstName').value;
    const apellido = document.getElementById('lastName').value;
    const direccion = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('phone').value;
    const id = document.getElementById('ID').value;
    const pais = document.getElementById('country').value;
    const estado = document.getElementById('state').value;
    const ciudad = document.getElementById('city').value;
    const indicaciones = document.getElementById('address2').value;

    if (!nombre || !apellido || !direccion || !email || !telefono || !id || !pais || !estado || !ciudad || !indicaciones ) {

      setShowModalForm(true);

    } else {

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
      });
      setLoading(true);

      if (!error) { 
        const { id } = paymentMethod;     // Código para el pago exitoso
        try {
          const { data } = await axios.post(
            "http://localhost:3000/api/checkout",
            {
              id,
              amount: totalPriceinBRLcents, // Envía el precio total en lugar del objeto { totalPrice }
              nombre: nombre,   // DATOS DEL COMPRADOR PARA ENVIO Y GUARDAR EN BD
              apellido: apellido,
              direccion: direccion,
              email: email,
              telefono: telefono,
              identificacion: id,
              pais: pais,
              estado: estado,
              ciudad: ciudad,
              extras: indicaciones
            }
          );
          console.log(data);

          elements.getElement(CardElement).clear(); // Reestablece el espacio de la tarjeta cuando se confirma el pago

          // Mostrar el modal de pago exitoso aquí
          setShowModal(true);
          console.log("showmodal:",{showModal});

        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
    };
  };

  console.log(!stripe || loading);

 
  return (
   
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h1>Formulario de pago</h1>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span id="cart-checkout" className="text-primary" color="black">Tu carrito</span>
              <span id="cart-counter-checkout" className="badge bg-primary rounded-pill" color="white" background-color ="rgba(121, 119, 119, 0.5)">{quantity}</span>
            </h4>
            <ul className="list-group mb-3">
              {cart.map((item, index) => (
                <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                  <div>
                    <h6 className="my-0">{item.name} : {item.quantity}</h6>
                  </div>
                  <span className="text-body-secondary">{item.price} ₲</span>
                </li>
              ))}

              <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div className="text-success">
                  <h6 className="my-0">Código Promocional</h6>
                  <small>Ejemplo:ZXCV1234</small>
                </div>
                <span className="text-success">−5%</span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (Gs.)</span>
                <strong>{totalPrice} ₲</strong>
              </li>
            </ul>

            <form className="card p-2" onSubmit={handlePromotionalCode}>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Código Promocional" value={promotionalCode} onChange={(e) => setPromotionalCode(e.target.value)}/>
                  <button type="submit" className="btn btn-secondary" >Validar</button>
                </div>
                {errorCodeProm && 
                  (<div className="invalid-feedback" style={{ marginTop: "0.5rem" }}>
                    {errorCodeProm}
                  </div>
                )}
              </form>


          </div> {/*FORMULARIO PARA ENVIO*/ }
          <div className="col-md-7 col-lg-8">
            <h3 className="mb-3">Dirección de Envio</h3>
            <form className="needs-validation" noValidate>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="firstName" placeholder="Ej: Juan Andres"  required />
                  <div className="invalid-feedback">
                    Se requiere un nombre válido.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Apellido</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Ej: Perez Gonzalez"  required />
                  <div className="invalid-feedback">
                    Se requiere un apellido válido.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="username" className="form-label">R.U.C o C.I.</label>
                  <div className="input-group has-validation">
                    <input type="text" className="form-control" id="ID" placeholder="RUC: 5670236-2 o C.I. 5670236" required />
                    <div className="invalid-feedback">
                      Identidad Requerida.
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email <span className="text-body-secondary"></span></label>
                  <input type="email" className="form-control" id="email" placeholder="Ej: robinasbakery@gmail.com" />
                  <div className="invalid-feedback">
                  Ingrese una dirección de correo electrónico válida para recibir actualizaciones de envío.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Teléfono <span className="text-body-secondary"></span></label>
                  <input type="email" className="form-control" id="phone" placeholder="Ej: 0981 333222" />
                  <div className="invalid-feedback">
                  Ingrese nro. de teléfono válido para recibir actualizaciones de envío.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input type="text" className="form-control" id="address" placeholder="Ej: 1234 Calle Palma" required />
                  <div className="invalid-feedback">
                    Por favor, ingrese su dirección.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">Indicaciones</label>
                  <input type="text" className="form-control" id="address2" placeholder="Ej: Casa o Apartamento Nro. 1234" />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">Pais</label>
                  <select className="form-select" id="country" required>
                    <option value="">Elegir...</option>
                    <option>Paraguay</option>
                  </select>
                  <div className="invalid-feedback">
                      Por favor agregar un país válido.
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">Estado</label>
                  <select className="form-select" id="state" value={selectedState} onChange={handleStateChange} required>
                    <option value="">Elegir...</option>
                    <option>Central</option>
                    <option>Alto Parana</option>
                    <option>Itapua</option>
                  </select>
                  <div className="invalid-feedback">
                      Por favor agregar un estado válida.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="city" className="form-label">Ciudad</label>
                  <select className="form-select" id="city" required>
                    <option value="">Elegir...</option>

                    {cities.map((city,index) => (

                       <option  key={index} value={city}>{city}</option> 

                    ))}

                  </select>
                  <div className="invalid-feedback">
                    Por favor agregar una ciudad válida.
                  </div>
                </div>

                <div className="col-md-2">
                  <label htmlFor="zip" className="form-label">Código Postal (Optional)</label>
                  <input type="text" className="form-control" id="zip" placeholder=""  />
                  <div className="invalid-feedback">
                    Codigo Postal.
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="same-address" />
                <label className="form-check-label" htmlFor="same-address">La dirección de envío es la misma que mi dirección de facturación</label>
              </div>

              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="save-info" />
                <label className="form-check-label" htmlFor="save-info">Recordarme</label>
              </div>

              <hr className="my-4" />
            </form>
          </div>
        </div>

        {/* Formulario de pago */}
        <h4 className="mb-3">Pagos</h4>
        <div className="col-md-7 col-lg-8">
          <form className="card card-body" onSubmit={handleSubmit}>
            <div className="my-3">
              <div className="form-check">
                <input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required />
                <label className="form-check-label" htmlFor="credit">Crédito</label>
              </div>
              <div className="form-check">
                <input id="debit" name="paymentMethod" type="radio" className="form-check-input" required />
                <label className="form-check-label" htmlFor="debit">Débito</label>
              </div>
            </div>

            {/* User Card Input */}
            <div id="card-element" style={{ border: "1px solid #ced4da", borderRadius: "5px" }}>
            <CardElement options={cardElementOptions} />
            </div>

            <button disabled={!stripe} className="btn btn-success" style={{marginTop:"8px"}}>
              {loading ? (
                <div className="spinner-border text-light" role="status">
                </div>
              ) : (
                "Pagar"
              )}
            </button>
          </form>
        </div>
        
        {/*Show Modal de pago exitoso*/ }
        {showModal && (
          <div>   {/* Nuevo pedazo*/}
            {/* Fondo oscurecido */}
            <div className="backdrop"></div> {/* Se abre y se cierra el div aca para que solo el fondo tenga ese background, si se envuelve todo el modal, el modal tambien va a agarrar el backgroud y no solo el fondo detras */}
            {/* Modal */}
            <div className="modal" tabIndex="-1" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">¡Pago Exitoso!</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>Tu pago se ha procesado con éxito.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                    <Link to="/" type="button" className="btn btn-primary" >Volver al Inicio</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )};

           
        {/*Show Modal si es que no se completaron los campos*/ }
        {showModalForm && (
          <div>   {/* Nuevo pedazo*/}
            {/* Fondo oscurecido */}
            <div className="backdrop"></div> {/* Se abre y se cierra el div aca para que solo el fondo tenga ese background, si se envuelve todo el modal, el modal tambien va a agarrar el backgroud y no solo el fondo detras */}
            {/* Modal */}
            <div className="modal" tabIndex="-1" style={{ display: "block" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Datos Incompletos</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModalForm(false)} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>Por favor, complete los campos con su información antes de proceder al pago.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModalForm(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )};

      </main>
    </div>

  );
};


