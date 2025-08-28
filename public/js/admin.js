import { getData } from "../services/fetch.js";

const contenedor = document.getElementById("listaSolicitudes");

async function mostrarSolicitudes() {
  const res = await getData("solicitudes")
  
  if (!res.length) {
    contenedor.innerHTML = "No hay solicitudes pendientes";
    return;
  }

  contenedor.innerHTML = ""; 
  res.forEach((solicitud) => {
    const divSolicitud = document.createElement("div")
    const h2Solicitud = document.createElement("h2")
    const pCodigoEquipo = document.createElement("p")

    h2Solicitud.textContent = `Sede: ${solicitud.sede} | ID Estudiante: ${solicitud.idEstudiante}`

const campos = [
  ["Código Equipo: ", solicitud.codigoEquipo],
  ["Fecha Salida: ", solicitud.fechaSalida ? solicitud.fechaSalida.slice(0,10) : ""],
  ["Fecha Regreso: ", solicitud.fechaRegreso ? solicitud.fechaRegreso.slice(0,10) : ""],
  ["Estado: ", solicitud.estado || "pendiente"]
];

pCodigoEquipo.innerHTML = "";
for (const [label, valor] of campos) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${label}</strong>${valor}`;
  pCodigoEquipo.appendChild(div);
}
    divSolicitud.appendChild(h2Solicitud)
    divSolicitud.appendChild(pCodigoEquipo)

    contenedor.appendChild(divSolicitud)

  })
}

mostrarSolicitudes();