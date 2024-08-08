import React, { useEffect } from 'react';

export const Index = () => {


    return (
        <>
            {/* Inicio de Bienvenida */}
            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 id="bienvenido">¡BIENVENIDOS!</h1>
                <div className="col-lg-6 mx-auto">
                    <h4 id="textoBienvenido" className="lead mb-4">
                        "Robina's Bakery, donde cada visita es una experiencia para deleitar tus sentidos con nuestro exquisito café, pan recién horneado y delicias artesanales. ¡Déjanos convertir cada momento en un placer para tu paladar!"
                    </h4>
                </div>
            </div>

            {/* Inicio del Carrousel 1 */}
            <div className="carrouselCSS">
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="active" aria-current="true" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item">
                            <img src="images/imagen-archivo-pasteleria_98.png" className="d-block w-100" alt="Nombre de la imagen" />
                            <div className="carousel-caption d-none d-md-block">
                                <h3 className="carrouselTitle">Pastelería</h3>
                                <p className="carousel-text">Contamos con una amplia variedad de dulces, pasteles y salados.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="images/cafe-gourmet.png" className="d-block w-100" alt="Nombre de la imagen" />
                            <div className="carousel-caption d-none d-md-block">
                                <h3 className="carrouselTitle">Cafetería</h3>
                                <p className="carousel-text">Contamos con una amplia variedad de cafés de distintas partes del mundo.</p>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="images/comodidad.png" className="d-block w-100" alt="Nombre de la imagen" />
                            <div className="carousel-caption d-none d-md-block">
                                <h3 className="carrouselTitle">Comodidad</h3>
                                <p className="carousel-text">Contamos con un amplio espacio para tu comodidad.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* Título del carrusel */}
            <h1 id="Categorias">Nuestras Categorias</h1>

            {/* Algunos Productos Carrousel 2 */}
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row">
                            <div className="col">
                                <a href="/salados"><img src="images/salgados.png" alt="..." /></a>
                            </div>
                            <div className="col">
                                <a href="/dulces"><img src="images/dulces.png" alt="..." /></a>
                            </div>
                            <div className="col">
                                <a href="/saludables"><img src="images/saludables.png" alt="..." /></a>
                            </div>
                            <div className="col">
                                <a href="/pasteles"><img src="images/pasteles.png" alt="..." /></a>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row">
                            <div className="col">
                                <a href="/canasta"><img src="images/canasta.png" alt="..." /></a>
                            </div>
                            <div className="col">
                                <a href="/combos"><img src="images/combos.jpg" alt="..." /></a>
                            </div>
                            <div className="col">
                                <a href="/cafe"><img src="images/cafeDeco.png" alt="..." /></a>
                            </div>
                            <div className="col">
                                <a href="/jugos"><img src="images/jugos.png" alt="..." /></a>
                            </div>
                        </div>
                    </div>
                    {/* Agrega más elementos carousel-item según sea necesario */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* DESTACADOS DE LA SEMANA */}
            <h1 id="Categorias">Destacados de la Semana</h1>

            {/* Cards */}
            <div id="cards-inicio" className="card-container">
                <div className="card">
                    <img src="images/pasteleria/pastel_de_zanahoria.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Pastel de Zanahoria</h5>
                        <p className="card-text">Delicioso pastel de zanahoria con bizcocho suave, zanahorias ralladas, canela, nueces y glaseado de queso crema.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Precio: 15.000 gs.</li>
                    </ul>
                    <div className="card-body">
                        <a href="/menu" className="card-link">
                            <button className="btn btn-primary" type="button">
                                Ir <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>

                <div className="card">
                    <img src="images/dulces/alfajores.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Alfajores</h5>
                        <p className="card-text">Alfajor casero con galletas suaves, relleno de dulce de leche casero. Una delicia artesanal que te envuelve en un abrazo de nostalgia y satisfacción.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Precio: 5.500 gs.</li>
                    </ul>
                    <div className="card-body">
                        <a href="/menu" className="card-link">
                            <button className="btn btn-primary" type="button">
                                Ir <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>

                <div className="card">
                    <img src="images/cafes/capuccino.png" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Capuccino</h5>
                        <p className="card-text">Espresso cremoso con leche espumosa y una capa de espuma de leche. Un viaje sensorial hacia Italia, con notas tostadas y un toque sutil de dulzura.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Precio: 16.500 gs</li>
                    </ul>
                    <div className="card-body">
                        <a href="/menu" className="card-link">
                            <button className="btn btn-primary" type="button">
                                Ir <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* INICIO DE ICONS */}
            <div className="px-4 py-5" id="icon-grid">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                    <div className="col d-flex align-items-start" id="IconBlock1">
                        <div className="icon-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-car-front" viewBox="0 0 16 16" id="icon">
                                <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                            </svg>
                            <h3 id="icon-title">ENTREGAS A DOMICILIO</h3>
                            <p>Domingo a Jueves de 09:00 hs. a 21:00 hs. Viernes y Sábados de 09:00 hs. a 22:00 hs.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start" id="IconBlock2">
                        <div className="icon-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16" id="icon">
                                <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                            </svg>
                            <h3 id="icon-title">HORARIO DE ATENCIÓN</h3>
                            <p>Domingo a Jueves de 08:00 hs. a 21:00 hs. Viernes y Sábados de 08:00 hs. a 22:00 hs.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start" id="IconBlock3">
                        <div className="icon-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-award" viewBox="0 0 16 16" id="icon">
                                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702z" />
                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                            </svg>
                            <h3 id="icon-title">CALIDAD CERTIFICADA</h3>
                            <p>Cumplimos con todos los estandares de certificación de calidad para brindar los mejores productos para ti.</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start" id="IconBlock4">
                        <div className="icon-content">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-piggy-bank" viewBox="0 0 16 16" id="icon">
                                <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.138-1.496A6.6 6.6 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.6 7.6 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962" />
                                <path fillRule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595M2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.6 6.6 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.65 4.65 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393m12.621-.857a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199" />
                            </svg>
                            <h3 id="icon-title">PAGO 100% SEGURO</h3>
                            <p>Sus pagos online están respaldados bajo la seguridad del servicio X.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};




