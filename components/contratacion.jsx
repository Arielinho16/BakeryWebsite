import React, { useState } from "react";
import axios from "axios";

export const Contrato = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Estados para manejar los valores de los campos
    const [nombre, setNombre] = useState('');
    const [identidad, setIdentidad] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [posicion, setPosicion] = useState('');
    const [disponibilidad, setDisponibilidad] = useState('');
    const [cartaPresentacion, setCartaPresentacion] = useState('');
    const [cvFile, setCvFile] = useState(null);
    const [fotoFile, setFotoFile] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!nombre || !identidad || !email || !telefono || !direccion || !posicion || !disponibilidad || !cartaPresentacion || !cvFile || !fotoFile) {
            console.error("Faltan campos por llenar");
            return;
        }

        setLoading(true);

        try {
            // Crear FormData para enviar datos y archivos
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('identidad', identidad);
            formData.append('email', email);
            formData.append('telefono', telefono);
            formData.append('direccion', direccion);
            formData.append('posicion', posicion);
            formData.append('disponibilidad', disponibilidad);
            formData.append('carta_presentacion', cartaPresentacion);
            formData.append('cv', cvFile);
            formData.append('foto', fotoFile);

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

            // Restablecer los valores de los campos
            setNombre('');
            setIdentidad('');
            setEmail('');
            setTelefono('');
            setDireccion('');
            setPosicion('');
            setDisponibilidad('');
            setCartaPresentacion('');
            setCvFile(null);
            setFotoFile(null);

        } catch (error) {
            console.error("Error al enviar los datos:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="formularioSolicitud">
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
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            placeholder="Nombre Completo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="identidad" className="form-label">Identificación</label>
                        <input
                            type="text"
                            className="form-control"
                            id="identidad"
                            placeholder="Cedula de Identidad"
                            value={identidad}
                            onChange={(e) => setIdentidad(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="nombre@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="123-456-7890"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Calle, Número, Ciudad, Estado, Código Postal"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Posición Deseada</label>
                        <select
                            className="form-select"
                            id="position"
                            value={posicion}
                            onChange={(e) => setPosicion(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="Chef">Chef</option>
                            <option value="Barista">Barista</option>
                            <option value="Cajero">Cajero</option>
                            <option value="Mozo">Mozo</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="availability" className="form-label">Disponibilidad Horaria</label>
                        <select
                            className="form-select"
                            id="availability"
                            value={disponibilidad}
                            onChange={(e) => setDisponibilidad(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="Tiempo Completo">Tiempo Completo</option>
                            <option value="Medio Tiempo">Medio Tiempo</option>
                            <option value="Horario Flexible">Horario Flexible</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cv" className="form-label">Adjuntar CV</label>
                        <input
                            className="form-control"
                            type="file"
                            id="cv"
                            onChange={(e) => setCvFile(e.target.files[0])}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="foto" className="form-label">Adjuntar Foto</label>
                        <input
                            className="form-control"
                            type="file"
                            id="foto"
                            onChange={(e) => setFotoFile(e.target.files[0])}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="coverLetter" className="form-label">Carta de Presentación</label>
                        <textarea
                            className="form-control"
                            id="coverLetter"
                            rows="4"
                            placeholder="Escribe una breve carta de presentación..."
                            value={cartaPresentacion}
                            onChange={(e) => setCartaPresentacion(e.target.value)}
                            required
                        ></textarea>
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



