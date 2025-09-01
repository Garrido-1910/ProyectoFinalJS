import { postData } from "../services/fetch.js";


const usuario_iniciales = localStorage.getItem("nombre").split(" ")
const iniciales = usuario_iniciales.map((inicial)=> inicial[0].toLocaleUpperCase()).join(" ")
const idEstudiante = document.getElementById("idEstudiante").value = iniciales;



window.addEventListener("DOMContentLoaded", () => {
  const t = localStorage.getItem("currentUser");
  mostrarMensaje("Bienvenido, por favor complete la solicitud de préstamo de computadora.", "info");
});
const form = document.getElementById("formSolicitud");
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
form.addEventListener("submit",async (e) => {
  e.preventDefault();
  const sede = document.getElementById("sede").value;
  const fechaSalida = new Date(document.getElementById("fechaSalida").value);
  const fechaRegreso = new Date(document.getElementById("fechaRegreso").value);
  const codigoEquipo = document.getElementById("codigoEquipo").value.trim();
  const condiciones = document.getElementById("condiciones").checked;
  const firma = document.getElementById("firma").value.trim();
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
