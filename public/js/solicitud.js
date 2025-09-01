import { postData } from "../services/fetch.js";



// Mostrar perfil en la sección superior
window.addEventListener("DOMContentLoaded", () => {
  // Foto de perfil
  const fotoPerfil = localStorage.getItem("fotoPerfil");
  const imgPerfil = document.getElementById("fotoPerfilSolicitud");
  if (imgPerfil && fotoPerfil) {
    imgPerfil.src = fotoPerfil;
  } else if (imgPerfil) {
    imgPerfil.src = "../img/fwdlogo.jpg"; // Imagen por defecto
  }
  // Nombre completo
  const nombreCompleto = localStorage.getItem("nombreCompleto") || localStorage.getItem("nombre") || "Usuario";
  const nombrePerfil = document.getElementById("nombrePerfilSolicitud");
  if (nombrePerfil) nombrePerfil.textContent = nombreCompleto;
  // Usuario
  const usuario = localStorage.getItem("currentUser") || "-";
  const usuarioPerfil = document.getElementById("usuarioPerfilSolicitud");
  if (usuarioPerfil) usuarioPerfil.textContent = usuario;
  // Iniciales para el campo ID
  const usuario_iniciales = nombreCompleto.split(" ");
  const iniciales = usuario_iniciales.map((inicial)=> inicial[0]?.toLocaleUpperCase() || "").join(" ");
  document.getElementById("idEstudiante").value = iniciales;
});


/* Evento al cargar la página: muestra mensaje y usuario */
window.addEventListener("DOMContentLoaded", () => {
  const t = localStorage.getItem("currentUser");
  mostrarMensaje("Bienvenido, por favor complete la solicitud de préstamo de computadora.", "info");
});

const form = document.getElementById("formSolicitud");

/* Muestra mensajes informativos, de error o de éxito */
function mostrarMensaje(msg, type = "error") {
  let msgDiv = document.getElementById("msg");
  if (!msgDiv) {
    msgDiv = document.createElement("div");
    msgDiv.id = "msg";
    form.parentNode.insertBefore(msgDiv, form);
  }
  msgDiv.innerText = msg;
  msgDiv.style.color = type === "error" ? "red" : type === "success" ? "green" : "#333";
  msgDiv.style.margin = "10px 0";
}

/* valida los datos y envía la solicitud */
form.addEventListener("submit",async (e) => {
  e.preventDefault();
  const sede = document.getElementById("sede").value;
  const fechaSalida = new Date(document.getElementById("fechaSalida").value);
  const fechaRegreso = new Date(document.getElementById("fechaRegreso").value);
  const codigoEquipo = document.getElementById("codigoEquipo").value.trim();
  const condiciones = document.getElementById("condiciones").checked;
  const firma = document.getElementById("firma").value.trim();
    /* Validaciones de campos */
  if (!idEstudiante) {
    mostrarMensaje("El ID del estudiante es obligatorio.");
    return;
  }
  if (!sede) {
    mostrarMensaje("Debes seleccionar una sede.");
    return;
  }
  if (!fechaSalida || !fechaRegreso) {
    mostrarMensaje("Debes seleccionar ambas fechas.");
    return;
  }
  if (fechaRegreso < fechaSalida) {
    mostrarMensaje("La fecha de regreso no puede ser anterior a la de salida.");
    return;
  }
  if (!/^PC-\d{4}-\d{2}$/.test(codigoEquipo)) {
    mostrarMensaje("El código del equipo debe tener el formato PC-YYYY-NN (ej: PC-2025-01).");
    return;
  }
  if (!condiciones) {
    mostrarMensaje("Debes aceptar las condiciones de uso.");
    return;
  }
  if (!firma) {
    mostrarMensaje("Debes ingresar tu firma digital.");
    return;
  }
  mostrarMensaje("Solicitud enviada con éxito.", "success");
  form.reset();
  const solicitud={
      idEstudiante: idEstudiante,
      sede:sede,
      fechaSalida: fechaSalida.toISOString(), 
      fechaRegreso: fechaRegreso.toISOString(), 
      codigoEquipo:codigoEquipo,
      firma: firma
  }
  const peticion = await postData(solicitud,"solicitudes")
  console.log(peticion)
});
/* términos y condiciones-mostrar/ocultar */
const btnTerminos = document.getElementById("toggleTerminos");
const terminos = document.querySelector(".terminos");
const ocultar = document.getElementById("ocultar")
btnTerminos.addEventListener("click", () => {
  terminos.classList.toggle("oculto");
  btnTerminos.textContent = terminos.classList.contains("oculto")
  ? "📑 Ver términos y condiciones" 
    : "❌ Ocultar términos y condiciones";
  btnTerminos.textContent == "📑 Ver términos y condiciones"  ? ocultar.style.display = "none" : ocultar.style.display = "block"
});

  document.getElementById("formSolicitud").addEventListener("submit", function(e) {
    e.preventDefault();
    window.location.href = "perfil.html";
  });
