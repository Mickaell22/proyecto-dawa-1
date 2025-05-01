import React from "react";

const Home = () => {
  return (
    <main className="main">
      <div className="content-container">
        <h2>Bienvenido al proyecto #1 de DAWA</h2>
        <p>
          Problematica: Juan tiene un negocio de reparación de equipos
          celulares, él importa los repuestos y debido a esto los precios que
          oferta son accesible para sus clientes (factura por repuestos y
          también el servicio de reparación). El negocio de Juan ha crecido
          mucho y el número de reparaciones ahora son demasiadas, tanto así que
          ha tenido que contratar técnicos para poder cumplir con las cuotas de
          reparaciones, no obstante, también tiene un problema y es que los
          clientes llaman y escriben a cada momento a su número para saber el
          estado de su equipo enviado a reparar, Juan no se abastece para
          contestar y ha tenido demasiados reclamos últimamente por ese
          inconveniente.{" "}
        </p>
        <p>
          Solucion: Juan ha decidido sistematizar su negocio, de tal forma que
          sus clientes puedan saber a través de una aplicación web el estado en
          que se encuentra su equipo sin necesidad de llamar o escribir, además
          aprovechará para que la sistematización le permita llevar un orden y
          control de su negocio.{" "}
        </p>
        Lo que se pide: Diseñar una aplicación web que cumpla con las
        expectativas que tiene Juan respecto a su negocio, para aquello ha dado
        carta libre para el diseño del mismo, sin embargo hay ciertos parámetros
        que se debe cumplir. • La arquitectura del sistema es programación en
        capas. • El front-end deberá ser desarrollado en React JS • El backen
        deberá ser desarrollado en Node.Js • EL motor de base de datos queda a
        elección del desarrollador. • Utilizar librerías para que el diseño
        visual del sitio tenga una adecuada experiencia del usuario.
        <p></p>
      </div>
    </main>
  );
};

export default Home;
