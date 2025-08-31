
const resultado = document.getElementById("resultado");
const filtronombre = document.getElementById("filtronombre");
const filtroFecha = document.getElementById("filtrofecha");
const filtroEstado = document.getElementById("filtroestado");
let solicitudes = [];


async function cargarSolicitudes() {
  const res = await fetch("http://localhost:3001/solicitudes"); // CAMBIO
  solicitudes = await res.json();
  mostrarSolicitudes();
}

function mostrarSolicitudes() {
  const nombre = filtronombre?.value.trim().toLowerCase() || "";
  const fecha = filtroFecha?.value || "";
  const estado = filtroEstado?.value || "";
  const filtradas = solicitudes.filter(s => {
    const filtraNombre = nombre ? (s.idEstudiante || "").toLowerCase().includes(nombre) : true;
    const filtraFecha = fecha ? s.fechaSalida.slice(0, 10) === fecha : true;
    const filtraEstado = estado ? s.estado === estado : true;
    return filtraNombre && filtraFecha && filtraEstado;
  });
  if (filtradas.length === 0) {
    resultado.innerHTML = "No hay solicitudes";
    return;
  }

  resultado.innerHTML = "";
  filtradas.forEach(s => {
    const div = document.createElement("div");
    div.innerHTML = `
   ${s.idEstudiante}
   ${s.sede} 
   ${s.fechaSalida.slice(0, 10)}
   ${s.fechaRegreso.slice(0, 10)} 
   ${s.codigoEquipo}
   ${s.estado || "pendiente"}
    `;
    resultado.appendChild(div);
  });
}

filtronombre.addEventListener("input", mostrarSolicitudes);
filtroFecha.addEventListener("input", mostrarSolicitudes);
filtroEstado.addEventListener("change", mostrarSolicitudes);

cargarSolicitudes();