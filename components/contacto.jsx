import React, { useState } from 'react';
import axios from 'axios';

export const Contacto = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [politicaAceptada, setPoliticaAceptada] = useState(false);

    // Estados para manejar los valores de los campos
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [area, setArea] = useState('');
    const [comentarios, setComentarios] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if (!nombre || !email || !area || !comentarios || !politicaAceptada) {
            console.error("Faltan campos por llenar o no se aceptó la política de privacidad");
            return;
        }

        setLoading(true);

        try {
            const formData = {
                nombre,
                email,
                area,
                comentarios,
                politicaAceptada,
            };

            // Enviar los datos al backend
            const { data } = await axios.post(
                "http://localhost:3000/api/contacto",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Datos enviados:", data);

            // Mostrar el modal de éxito
            setShowModalConfirm(true);

            // Restablecer los valores de los campos
            setNombre('');
            setEmail('');
            setArea('');
            setComentarios('');
            setPoliticaAceptada(false);

        } catch (error) {
            console.error("Error al enviar los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleCloseConfirm = () => setShowModalConfirm(false);

    const handlePoliticaChange = (e) => {
        setPoliticaAceptada(e.target.checked);
    };

    return (
        <div className="contacto-container">
            <div className="contacto-form">
                <h2>Contáctanos</h2>
                <p>Si tienes alguna duda, comentario o sugerencia, puedes contactarnos y nos comunicaremos contigo lo antes posible.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre completo*</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="area">Deseo contactar con el área de*</label>
                    <select
                        id="area"
                        name="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    >
                        <option value="">-- Selecciona una opción --</option>
                        <option value="ventas">Atención al Cliente</option>
                        <option value="general">Información General</option>
                    </select>

                    <label htmlFor="comentarios">Comentarios*</label>
                    <textarea
                        id="comentarios"
                        name="comentarios"
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                        required
                    ></textarea>

                    <div className="form-checkbox">
                        <input
                            type="checkbox"
                            id="politica"
                            name="politica"
                            style={{ width: "20px", height: "20px" }}
                            checked={politicaAceptada}
                            onChange={handlePoliticaChange}
                            required
                        />
                        <label className="form-check-label" htmlFor="politicaPrivacidad">
                            He leído y acepto la <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleShow}>política de privacidad</span>.
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{
                        margin: "0 auto",
                        backgroundColor: "#5d2417",
                        width: "200px",
                        padding: "0.5em",
                        border: "1px solid whitesmoke",
                        borderRadius: "5px",
                        boxShadow: "5px 5px 5px #000800",
                        color: "white",
                        textDecoration: "none"
                    }}>
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
            </div>

            {/* Modal de Confirmacion */}
            {showModalConfirm && (
                <div>
                    <div className="backdrop"></div>
                    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">¡Enviado!</h5>
                                </div>
                                <div className="modal-body">
                                    <p> Tu formulario fue enviado correctamente, nos pondremos en contacto contigo en la brevedad posible.</p>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={handleCloseConfirm} className="btn btn-secondary">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Politica de Privacidad */}
            {showModal && (
                <div>
                    <div className="backdrop"></div>
                    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Política de Privacidad de Robina's Bakery</h5>
                                </div>
                                <div className="modal-body">
                                    <p>En Robina's Bakery, tu privacidad es importante para nosotros. Recopilamos y utilizamos tu información personal únicamente para procesar pedidos, mejorar nuestros servicios, y enviarte actualizaciones y promociones si así lo deseas.

                                        Protección de Datos: Tomamos medidas de seguridad para proteger tu información. Solo compartimos tus datos cuando es necesario para completar tu pedido o cumplir con la ley.

                                        Cookies: Usamos cookies para mejorar tu experiencia en nuestro sitio web. Puedes desactivarlas en la configuración de tu navegador, aunque esto puede afectar algunas funciones del sitio.

                                        Tus Derechos: Puedes acceder, corregir o eliminar tu información personal en cualquier momento. Para cualquier consulta, contáctanos en info@robinasbakery.com.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={handleClose} className="btn btn-secondary">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};




