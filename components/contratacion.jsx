import React from 'react';

export const Contrato = () => {
    return (
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

            <form>
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
                    <label htmlFor="cv" className="form-label">Adjuntar Foto</label>
                    <input className="form-control" type="file" id="cv" required />
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
                }}>Enviar Solicitud</button>
            </form>
        </div>
    );
};
