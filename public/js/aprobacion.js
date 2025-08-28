const contenedor = document.getElementById("listaSolicitudes");

async function obtenerPendientes() {
  try {
    const res = await fetch('http://localhost:3000/solicitudes?estado=pendiente');
    const datos = await res.json();
    mostrarSolicitudes(datos);
  } catch (e) {
    contenedor.innerHTML = "Error cargando solicitudes";
  }
}

function mostrarSolicitudes(lista) {
  if (!lista.length) {
    contenedor.innerHTML = "No hay solicitudes pendientes";
    return;
  }
  let html = `<table><thead><tr>
    <th>Estudiante</th><th>Fecha Salida</th><th>Fecha Regreso</th><th>Equipo</th><th>Acciones</th>
  </tr></thead><tbody>`;
  for (const s of lista) {
    html += `<tr>
      <td>${s.estudiante || ''}</td>
      <td>${s.fecha_salida || ''}</td>
      <td>${s.fecha_regreso || ''}</td>
      <td>${s.codigo_equipo || ''}</td>
      <td>
        <button onclick="actualizarEstado('${s.id}','aprobada')">Aprobar</button>
        <button onclick="actualizarEstado('${s.id}','rechazada')">Rechazar</button>
      </td>
    </tr>`;
  }
  html += `</tbody></table>`;
  contenedor.innerHTML = html;
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