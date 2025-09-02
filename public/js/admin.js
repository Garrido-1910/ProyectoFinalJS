

import { getData, patchData } from "../services/fetch.js";


const contenedor = document.getElementById("listaSolicitudes");


async function cargarSelect() {
  const listaUsuarios = document.getElementById("listaUsuarios");
  const usuarios = await getData("usuarios");

  usuarios.forEach((usuario)=>{
     const option = document.createElement("option");
     option.value = usuario.id;
     option.textContent = usuario.correo

     listaUsuarios.appendChild(option)

    })
    listaUsuarios.addEventListener("change",function(e){
      localStorage.setItem("idAdminNuevo",e.target.value)
    })
    const btnAsignar = document.getElementById("btnAsignar");
    btnAsignar.addEventListener("click",async function() {
        const cambioAdmin = await patchData({"tipoUsuario":"profesor"},"usuarios",localStorage.getItem("idAdminNuevo"))
         
    })
}
cargarSelect()


async function patchSolicitud(id, nuevoEstado) {
  await fetch(`http://localhost:3001/solicitudes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado })
  });
}

async function putSolicitud(id, data) {
  await fetch(`http://localhost:3001/solicitudes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

async function deleteSolicitud(id) {
  await fetch(`http://localhost:3001/solicitudes/${id}`, {
    method: "DELETE" });
}

async function mostrarSolicitudes() {
  const res = await getData("solicitudes");
  try {
  } catch {
    contenedor.innerHTML = "Error al cargar solicitudes";
    return;
  }
  // Filtrar solo pendientes (o sin estado)
  const pendientes = res.filter(s => !s.estado || s.estado.toLowerCase() === "pendiente");
  if (!Array.isArray(pendientes) || !pendientes.length) {
    contenedor.innerHTML = "No hay solicitudes pendientes";
    return;
  }
  contenedor.innerHTML = "";
  pendientes.forEach((solicitud) => {
    const divSolicitud = document.createElement("div");
    divSolicitud.className = "solicitud-item";
    const h2Solicitud = document.createElement("h2");
    const pCodigoEquipo = document.createElement("p");
    h2Solicitud.textContent = solicitud.sede;
    pCodigoEquipo.textContent = `Equipo: ${solicitud.codigoEquipo}`;
    divSolicitud.appendChild(h2Solicitud);
    divSolicitud.appendChild(pCodigoEquipo);
    // Estado actual
    const pEstado = document.createElement("p");
    pEstado.textContent = `Estado: ${solicitud.estado || "pendiente"}`;
    divSolicitud.appendChild(pEstado);
    // Botones de acción
    const btnAprobar = document.createElement("button");
    btnAprobar.textContent = "Aprobar";
    btnAprobar.onclick = async () => {
      await patchSolicitud(solicitud.id, "aprobada");
      mostrarSolicitudes();
    };
    const btnRechazar = document.createElement("button");
    btnRechazar.textContent = "Rechazar";
    btnRechazar.onclick = async () => {
      await patchSolicitud(solicitud.id, "rechazada");
      mostrarSolicitudes();
    };
    const btnProceso = document.createElement("button");
    btnProceso.textContent = "En proceso";
    btnProceso.onclick = async () => {
      await patchSolicitud(solicitud.id, "en proceso");
      mostrarSolicitudes();
    };
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = async () => {
      await deleteSolicitud(solicitud.id);
      mostrarSolicitudes();
    };
    divSolicitud.appendChild(btnAprobar);
    divSolicitud.appendChild(btnRechazar);
    divSolicitud.appendChild(btnProceso);
    divSolicitud.appendChild(btnEliminar);
    contenedor.appendChild(divSolicitud);
  });
}

mostrarSolicitudes();

    function cerrarSesion() {
    // Borra datos de sesión relevantes
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('nombre');
    localStorage.removeItem('fotoPerfil');
    localStorage.removeItem('codigoEquipo');
    // Redirige al login
    window.location.href = "../pages/iniciosecion.html";
  }
  document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);