
const resultado = document.getElementById("resultado");
const filtronombre = document.getElementById("filtronombre");
const filtroFecha = document.getElementById("filtrofecha");
const filtroEstado = document.getElementById("filtroestado");
let solicitudes = [];

async function cargarSolicitudes() {
  let res = [];
  try {
    res = await fetch("http://localhost:3000/solicitudes");
    solicitudes = await res.json();
  } catch {
    resultado.innerHTML = "Error al cargar solicitudes";
    return;
  }
  mostrarSolicitudes();
}

function mostrarSolicitudes() {
  const nombre = filtronombre?.value.trim().toLowerCase() || "";
  const fecha = filtroFecha?.value || "";
  const estado = filtroEstado?.value || "";
  const filtradas = solicitudes.filter(s => {
    const filtraNombre = s.estudiante?.toLowerCase().includes(nombre);
    const filtraFecha = fecha ? s.fecha_salida === fecha : true;
    const filtraEstado = estado ? s.estado === estado : true;
    return filtraNombre && filtraFecha && filtraEstado;
  });
  if (filtradas.length === 0) {
    resultado.innerHTML = "No hay solicitudes";
    return;
  }
  // Aquí puedes renderizar las solicitudes filtradas
}

cargarSolicitudes();