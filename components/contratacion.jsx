import React, { useState } from "react";
import axios from "axios";

export const Contrato = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        const nombre = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('phone').value;
        const direccion = document.getElementById('address').value;
        const posicion = document.getElementById('position').value;
        const disponibilidad = document.getElementById('availability').value;
        const carta_presentacion = document.getElementById('coverLetter').value;
        const cvFile = document.getElementById('cv').files[0];
        const fotoFile = document.getElementById('foto').files[0];

        if (!nombre || !email || !telefono || !direccion || !posicion || !disponibilidad || !carta_presentacion || !cvFile || !fotoFile) {
            // Reproducir sonido de error o mostrar modal de error si algún campo está vacío
            console.error("Faltan campos por llenar");
        } else {
            setLoading(true);

            try {
                // Crear FormData para enviar datos y archivos
                const formData = new FormData();
                formData.append('nombre', nombre);
                formData.append('email', email);
                formData.append('telefono', telefono);
                formData.append('direccion', direccion);
                formData.append('posicion', posicion);
                formData.append('disponibilidad', disponibilidad);
                formData.append('carta_presentacion', carta_presentacion);
                formData.append('cv', cvFile); // Añadir el archivo CV
                formData.append('foto', fotoFile); // Añadir el archivo de la foto

                // Enviar los datos al backend
                const { data } = await axios.post(
                    "http://localhost:3000/api/contratacion",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log("Datos enviados:", data);

                // Mostrar el modal de éxito aquí
                setShowModal(true);

            } catch (error) {
                console.error("Error al enviar los datos:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <h2 className="text-center mb-4" id="empresa-title" style={{ marginBottom: '30px' }}>Trabaja con Nosotros</h2>

                {/* Imagen debajo del título */}
                <div className="text-center mb-4" id="contratacion">
                    <img
                        src="/images/contratacion-imagen.jpg"
                        alt="Trabaja con Nosotros"
                        className="profile"
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" id="fullName" placeholder="Nombre Completo" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="nombre@ejemplo.com" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="phone" placeholder="123-456-7890" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="address" placeholder="Calle, Número, Ciudad, Estado, Código Postal" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Posición Deseada</label>
                        <select className="form-select" id="position" required>
                            <option value="">Seleccione una opción</option>
                            <option value="Chef">Chef</option>
                            <option value="Barista">Barista</option>
                            <option value="Cajero">Cajero</option>
                            <option value="Mozo">Mozo</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="availability" className="form-label">Disponibilidad Horaria</label>
                        <select className="form-select" id="availability" required>
                            <option value="">Seleccione una opción</option>
                            <option value="Tiempo Completo">Tiempo Completo</option>
                            <option value="Medio Tiempo">Medio Tiempo</option>
                            <option value="Horario Flexible">Horario Flexible</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cv" className="form-label">Adjuntar CV</label>
                        <input className="form-control" type="file" id="cv" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="foto" className="form-label">Adjuntar Foto</label>
                        <input className="form-control" type="file" id="foto" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="coverLetter" className="form-label">Carta de Presentación</label>
                        <textarea className="form-control" id="coverLetter" rows="4" placeholder="Escribe una breve carta de presentación..."></textarea>
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
                        {loading ? 'Enviando...' : 'Enviar Solicitud'}
                    </button>
                </form>
            </div>

            {/* Modal de envío exitoso */}
            {showModal && (
                <div>
                    <div className="backdrop"></div>
                    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">¡Enviado!</h5>
                                </div>
                                <div className="modal-body">
                                    <p>Sus datos han sido enviados correctamente.</p>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={() => setShowModal(false)} className="btn btn-secondary" style={{
                                        margin: "0 auto",
                                        backgroundColor: "#5d2417",
                                        width: "200px",
                                        padding: "0.5em",
                                        border: "1px solid whitesmoke",
                                        borderRadius: "5px",
                                        boxShadow: "5px 5px 5px #000800",
                                        color: "white",
                                        textDecoration: "none"
                                    }}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


