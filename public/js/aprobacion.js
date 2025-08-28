import { getData } from "../services/fetch.js";

const contenedor = document.getElementById("listaSolicitudes");


async function mostrarSolicitudes(lista) {
  const res = await getData("solicitudes")
  
  if (!res.length) {
    contenedor.innerHTML = "No hay solicitudes pendientes";
    return;
  }
  res.forEach((solicitud) => {
    const divSolicitud = document.createElement("div")
    const h2Solicitud = document.createElement("h2")
    const pCodigoEquipo = document.createElement("p")

    h2Solicitud.textContent = solicitud.sede
    pCodigoEquipo.textContent = solicitud.codigoEquipo
    divSolicitud.appendChild(h2Solicitud)
    divSolicitud.appendChild(pCodigoEquipo)

    contenedor.appendChild(divSolicitud)

  })
}


mostrarSolicitudes();