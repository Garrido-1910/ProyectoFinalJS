
window.addEventListener("DOMContentLoaded", () => {
  const usuarioDiv = document.querySelector(".usuario h1");
  usuarioDiv.textContent = "Mi gallo 🐓";
  alert("Bienvenido, por favor complete la solicitud de préstamo de computadora.");
});

const form = document.getElementById("formSolicitud");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const idEstudiante = document.getElementById("idEstudiante").value.trim();
  const sede = document.getElementById("sede").value;
  const fechaSalida = new Date(document.getElementById("fechaSalida").value);
  const fechaRegreso = new Date(document.getElementById("fechaRegreso").value);
  const codigoEquipo = document.getElementById("codigoEquipo").value.trim();
  const condiciones = document.getElementById("condiciones").checked;
  const firma = document.getElementById("firma").value.trim();

  if (!idEstudiante) {
    alert("⚠️ El ID del estudiante es obligatorio.");
    return;
  }

  if (!sede) {
    alert("⚠️ Debes seleccionar una sede.");
    return;
  }

  if (!fechaSalida || !fechaRegreso) {
    alert("⚠️ Debes seleccionar ambas fechas.");
    return;
  }

  if (fechaRegreso < fechaSalida) {
    alert("⚠️ La fecha de regreso no puede ser anterior a la de salida.");
    return;
  }

  if (!/^PC-\d{4}-\d{2}$/.test(codigoEquipo)) {
    alert("⚠️ El código del equipo debe tener el formato PC-YYYY-NN (ej: PC-2025-01).");
    return;
  }

  if (!condiciones) {
    alert("⚠️ Debes aceptar las condiciones de uso.");
    return;
  }

  if (!firma) {
    alert("⚠️ Debes ingresar tu firma digital.");
    return;
  }

  alert("✅ Solicitud enviada con éxito.");
  form.reset(); 
});

const btnTerminos = document.getElementById("toggleTerminos");
const terminos = document.querySelector(".terminos");

btnTerminos.addEventListener("click", () => {
  terminos.classList.toggle("oculto");

  if (terminos.classList.contains("oculto")) {
    btnTerminos.textContent = "📑 Ver términos y condiciones";
  } else {
    btnTerminos.textContent = "❌ Ocultar términos y condiciones";
  }
});
