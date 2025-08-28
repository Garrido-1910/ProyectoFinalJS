const contenedor = document.getElementById("listaSolicitudes");

async function obtenerPendientes() {
  const res = await fetch('http://localhost:3000/solicitudes?estado=pendiente');
  const datos = await res.json();
  mostrarSolicitudes(datos);
}

function mostrarSolicitudes(lista) {
  if (!lista.length) {
    contenedor.innerHTML = "No hay solicitudes pendientes";
    return;
  }
}

window.actualizarEstado = async function(id, nuevoEstado) {
  await fetch(`http://localhost:3000/solicitudes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });
  obtenerPendientes();
}

obtenerPendientes();