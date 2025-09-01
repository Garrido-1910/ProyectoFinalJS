
import { getData } from "../services/fetch.js";

const contenedor = document.getElementById("listaSolicitudes");
/* Función para mostrar las solicitudes para aprobación */
async function mostrarSolicitudes() {
  let res = [];
  try {
    res = await getData("solicitudes");
  } catch {
    contenedor.innerHTML = "Error al cargar solicitudes";
    return;
  }
  if (!Array.isArray(res) || !res.length) {
    contenedor.innerHTML = "No hay solicitudes pendientes";
    return;
  }
  contenedor.innerHTML = "";
  res.forEach((solicitud) => {
    const divSolicitud = document.createElement("div");
    const h2Solicitud = document.createElement("h2");
    const pCodigoEquipo = document.createElement("p");
    h2Solicitud.textContent = solicitud.sede;
    pCodigoEquipo.textContent = solicitud.codigoEquipo;
    divSolicitud.appendChild(h2Solicitud);
    divSolicitud.appendChild(pCodigoEquipo);
    contenedor.appendChild(divSolicitud);
  });
}

mostrarSolicitudes();