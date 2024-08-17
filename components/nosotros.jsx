import React from 'react';

export const Informacion = () => {

    return (
        <div>
            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 id="bienvenido" style={{ marginBottom: "40px" }}>Robina's Bakery</h1>
                <img className="profile" id="local1" src="images/local1.png" alt="Robina's local photo" />
                <div className="col-lg-6 mx-auto">
                    <h4 id="textoBienvenido" className="lead mb-4">
                        En el tranquilo año de 2021, en Asunción, nació Robina's Bakery en el hogar de la familia Vallejos.
                        Iniciando como una modesta cafetería en la sala de estar, Isabella Vallejos deleitaba a sus vecinos
                        con el cafe, pasteles y galletas caserss. Con el tiempo, la reputación de Robina's Bakery creció,
                        atrayendo a clientes de toda la capital en busca de su cálida hospitalidad y productos de calidad.
                        Integrandose como parte del equipo el magnifico chef parisino Cedric Grolet y también el chef
                        italiano Magri Alberto a las ajetreadas y vivas cocinas de Robina´s Bakery.
                        Inspirados por el amor y apoyo de la comunidad, la familia Vallejos expandió así el negocio, manteniendo
                        el encanto familiar que los hizo famosos, convirtiendo a Robina's Bakery en un símbolo de tradición
                        y excelencia en Asunción.
                    </h4>
                </div>

                <div className="row" style={{ marginBottom: "80px", marginTop: "80px", fontFamily: '"Playfair Display", serif' }}>
                    <div className="col-lg-4 text-center" style={{ color: "white" }}>
                        <img src="images/ariel.png" className="bd-placeholder-img rounded-circle" width="180" height="180" alt="Ariel Vallejos" />
                        <h2 className="fw-normal" >Ariel Vallejos</h2>
                        <p>Propietario de la cafeteria Robina´s Bakery</p>
                    </div>
                    <div className="col-lg-4 text-center" style={{ color: "white" }}>
                        <img src="images/cedric.png" className="bd-placeholder-img rounded-circle" width="180" height="180" alt="Cedric Grolet" />
                        <h2 className="fw-normal" >Cedric Grolet</h2>
                        <p>Chef Principal y gerente de la cafeteria Robina´s Bakery</p>
                    </div>
                    <div className="col-lg-4 text-center" style={{ color: "white" }}>
                        <img src="images/magri.png" className="bd-placeholder-img rounded-circle" width="180" height="180" alt="Isabella Vallejos" />
                        <h2 className="fw-normal">Magri Alberto</h2>
                        <p>Chef Principal de la cafeteria Robina´s Bakery</p>
                    </div>
                </div>

            </div>

            <div className="container marketing">  {/* Imagenes de los locales */}

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">Chef Cedric Grolet</h2>
                        <p className="lead" style={{ fontSize: "150%" }}>Nuestro chef principal deleitando con una de sus especialidades</p>
                        <a href="https://www.tiktok.com/@cedricgrolet" style={{ fontSize: "100%" }}>Ver en Tiktok</a>
                    </div>
                    <div className="col-md-5">
                        <video className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" id="videoNosotros" controls>
                            <source src="videos/video1.mp4" type="video/mp4" />
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">Chef Magri Alberto</h2>
                        <p className="lead" style={{ fontSize: "150%" }}>Nuestro otro chef principal preparando una de sus especialidades</p>
                        <a href="https://www.tiktok.com/@pastrychef_am" style={{ fontSize: "100%" }}>Ver en Tiktok</a>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <video className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" id="videoNosotros" controls>
                            <source src="videos/video2.mp4" type="video/mp4" />
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    </div>
                </div>
            </div>
        </div>    




    );

};