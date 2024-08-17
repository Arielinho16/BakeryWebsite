import React, { useState } from 'react';


export const Empresa = () => {
    const faqs = [
        {
            question: '¿Cuáles son las opciones de café que ofrecen y cuál es su recomendación?',
            answer: 'Nuestras opciones de café incluyen espresso, americano, cappuccino, latte, y más. Nuestra recomendación es probar nuestro delicioso latte con un toque de caramelo.'
        },
        {
            question: '¿Tienen opciones de café descafeinado o para personas con intolerancias/alergias alimentarias?',
            answer: 'Sí, ofrecemos café descafeinado y también tenemos alternativas sin lácteos para personas con intolerancias o alergias alimentarias.'
        },
        {
            question: '¿Ofrecen opciones de alimentos para acompañar el café más saludables?',
            answer: 'Sí, contamos con un apartado de platos saludables en el local, puedes verlo en nuestro Menú o en el Inicio en Nuestras Categorías en la opción Saludables.'
        },
        {
            question: '¿Cuál es el horario de atención y los días de la semana en que están abiertos?',
            answer: 'Domingo a Jueves de 07:00 hs. a 22:00 hs. Viernes y Sábados de 07:00 hs. a 23:00 hs.'
        },
    ];

    return (
        <>
            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 id="empresa-title" style={{ marginBottom: '50px' }}>Preguntas Frecuentes</h1>
                <div className="col-lg-6 mx-auto">
                    <ul className="empresa-list list-unstyled">
                        {faqs.map((faq, index) => (
                            <li key={index} className="mb-3" id="textoBienvenido">
                                <p style={{ marginBottom: '10px' }}>• {faq.question}</p>
                                <p style={{ marginLeft: '20px' }}>- {faq.answer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="px-4 pt-5 my-5 text-center border-bottom">
                <h1 id="empresa-title" style={{ marginBottom: '50px' }}>Terminos y Condiciones</h1>
                <div className="col-lg-6 mx-auto">
                    <ul className="empresa-list list-unstyled" id="textoBienvenido">
                        <p>
                            Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Robina's Bakery, ubicado en robinasbakery.com.
                        </p>
                        <p id='terminos'>Uso del Sitio</p>
                        <p>
                            Al acceder a este sitio web asumimos que aceptas estos términos y condiciones. No continúes usando Robina's Bakery si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
                        </p>
                        <p id='terminos'>Cookies</p>
                        <p>
                            Empleamos el uso de cookies. Al acceder a Robina's Bakery, aceptas utilizar cookies de acuerdo con la política de privacidad de Robina's Bakery.
                        </p>
                        <p id='terminos'>Licencia</p>
                        <p>
                            A menos que se indique lo contrario, Robina's Bakery y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Robina's Bakery. Todos los derechos de propiedad intelectual están reservados. Puedes acceder a esto desde Robina's Bakery para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
                        </p>
                        <p id='terminos'>Contenido del Usuario</p>
                        <p>
                            Partes de este sitio web ofrecen a los usuarios la oportunidad de publicar e intercambiar opiniones e información en ciertas áreas del sitio web. Robina's Bakery no filtra, edita, publica ni revisa los comentarios antes de su presencia en el sitio web. Los comentarios no reflejan los puntos de vista ni las opiniones de Robina's Bakery, sus agentes y/o afiliados.
                        </p>
                        <p id='terminos'>Enlaces Externos</p>
                        <p>
                            Nuestro servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por Robina's Bakery. Robina's Bakery no tiene control sobre, y no asume ninguna responsabilidad por, el contenido, las políticas de privacidad o las prácticas de los sitios web o servicios de terceros.
                        </p>
                        <p id='terminos'>Modificaciones</p>
                        <p>
                            Robina's Bakery se reserva el derecho de revisar estos términos y condiciones en cualquier momento. Al utilizar este sitio web, aceptas estar sujeto a la versión actual de estos términos y condiciones.
                        </p>
                    </ul>
                </div>
            </div>

        </>

    );


};