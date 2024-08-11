import React from 'react';

export const Local = () => {
    return (
        <div>
            {/* Main content */}
            <main>
                <div className="container marketing">  {/* imagenes de los locales */}

                    <hr className="featurette-divider" />

                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading fw-normal lh-1">Casa Central, Asunción Centro</h2>
                            <p className="lead">Direccion: P9C6+2H7, Palma, Asunción 001012</p>
                            <p className="lead">Horario de Atencion: 07:30hs a 21:00hs</p>
                            <a href="https://www.google.com/maps/place/Palma,+Asunci%C3%B3n/@-25.2801585,-57.6382395,17z/data=!3m1!4b1!4m6!3m5!1s0x945da7f30b03e239:0xafe16e5d63733c6e!8m2!3d-25.2801585!4d-57.6382395!16s%2Fg%2F1tfznf9d?entry=ttu" >Ver Maps</a>
                        </div>
                        <div className="col-md-5">
                            <img src="images/local1.png" alt="Descripción de la primera imagen" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" />
                        </div>
                    </div>

                    <hr className="featurette-divider" />

                    <div className="row featurette">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading fw-normal lh-1">Sucursal La Cuadrita </h2>
                            <p className="lead">Direccion: Alberto De Sousa 5295, Asunción 001413</p>
                            <p className="lead">Horario de Atencion: 08:00hs a 22:00hs</p>
                            <a href="https://www.google.com/maps/place/Alberto+De+Sousa+5295,+Asunci%C3%B3n+1849/data=!4m2!3m1!1s0x945da896ccade01d:0x13ac39f6d81b3bf5?sa=X&ved=1t:242&ictx=111" >Ver Maps</a>
                        </div>
                        <div className="col-md-5 order-md-1">
                            <img src="images/local2.png" alt="Descripción de la segunda imagen" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" />
                        </div>
                    </div>

                    <hr className="featurette-divider" />

                    <div className="row featurette">
                        <div className="col-md-7">
                            <h2 className="featurette-heading fw-normal lh-1">Sucursal Avda. España </h2>
                            <p className="lead">Direccion: Av. España, Asunción 001208</p>
                            <p className="lead">Horario de Atencion: 08:00hs a 21:00hs</p>
                            <a href="https://www.google.com/maps/place/Av.+Espa%C3%B1a+1208,+Asunci%C3%B3n+001411/data=!4m2!3m1!1s0x945da8a03e4bac19:0x2046c73ee25798fc?sa=X&ved=1t:242&ictx=111" >Ver Maps</a>
                        </div>
                        <div className="col-md-5">
                            <img src="images/local3.png" alt="Descripción de la tercera imagen" className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" />
                        </div>
                    </div>


                    <hr className="featurette-divider" />
                </div>

                <footer className="container">
                    <p className="float-end">
                        <a href="#" >Volver arriba</a>
                    </p>
                </footer>
            </main>
        </div>
    );
};
