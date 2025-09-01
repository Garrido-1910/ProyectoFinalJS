
import { getData } from "../services/fetch.js";

const resultado = document.getElementById("resultado");
const usuarioActual = localStorage.getItem("currentUser");


function getNamePerfil() {
	return document.getElementById("nameperfil");
}
function getBtnEditarNombre() {
	return document.getElementById("nombreperfil");
}
const btnFoto = document.getElementById("fotoperfil");
const imgPerfil = document.querySelector(".perfilcard img");

let usuarioDb = null;

// Mostrar nombre de usuario y asignar eventos
window.addEventListener("DOMContentLoaded", async () => {
	const namePerfil = getNamePerfil();
	if (usuarioActual && namePerfil) {
		// Buscar el usuario en db.json vía backend
		let usuarios = [];
		try {
			usuarios = await getData("usuarios");
		} catch {}
		usuarioDb = usuarios.find(u =>
			u.usuario?.toLowerCase() === usuarioActual.toLowerCase() ||
			u.nombre?.toLowerCase() === usuarioActual.toLowerCase() ||
			u.correo?.toLowerCase() === usuarioActual.toLowerCase()
		);
		namePerfil.textContent = usuarioDb?.nombre || usuarioActual;
	}
	cargarHistorialUsuario();
	asignarEventoEditarNombre();
});

function asignarEventoEditarNombre() {
	const btnEditarNombre = getBtnEditarNombre();
	const namePerfil = getNamePerfil();
	if (btnEditarNombre && namePerfil) {
		btnEditarNombre.onclick = () => {
			if (!usuarioDb) return;
			// Reemplazar el h2 por un input temporal y un botón guardar
			const input = document.createElement("input");
			input.type = "text";
			input.value = usuarioDb.nombre;
			input.id = "inputNuevoNombre";
			input.style.marginRight = "8px";
			const btnGuardar = document.createElement("button");
			btnGuardar.textContent = "Guardar";
			btnGuardar.type = "button";
			// Reemplazar h2 por input y botón
			namePerfil.replaceWith(input);
			btnEditarNombre.replaceWith(btnGuardar);
			input.focus();
			btnGuardar.onclick = async () => {
				const nuevoNombre = input.value.trim();
				if (!nuevoNombre) return alert("El nombre no puede estar vacío");
				// PATCH al backend
				try {
					await fetch(`http://localhost:3001/usuarios/${usuarioDb.id}`, {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ nombre: nuevoNombre })
					});
					usuarioDb.nombre = nuevoNombre;
					// Restaurar h2 y botón
					const nuevoH2 = document.createElement("h2");
					nuevoH2.id = "nameperfil";
					nuevoH2.textContent = nuevoNombre;
					input.replaceWith(nuevoH2);
					const nuevoBtn = document.createElement("button");
					nuevoBtn.id = "nombreperfil";
					nuevoBtn.textContent = "Editar Nombre";
					btnGuardar.replaceWith(nuevoBtn);
					asignarEventoEditarNombre(); // Reasignar evento al nuevo botón
				} catch {
					alert("Error al guardar el nombre");
				}
			};
		};
	}
}

// Cambiar foto de perfil (abrir explorador de archivos y mostrar imagen)
if (btnFoto && imgPerfil) {
	btnFoto.addEventListener("click", () => {
		// Crear input file oculto
		let input = document.getElementById("inputFotoPerfil");
		if (!input) {
			input = document.createElement("input");
			input.type = "file";
			input.accept = "image/*";
			input.id = "inputFotoPerfil";
			input.style.display = "none";
			document.body.appendChild(input);
		}
		input.value = ""; // Limpiar selección previa
		input.onchange = e => {
			const file = e.target.files[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = function(evt) {
				imgPerfil.src = evt.target.result;
				localStorage.setItem("fotoPerfil", evt.target.result);
			};
			reader.readAsDataURL(file);
		};
		input.click();
	});
	// Mostrar foto guardada si existe
	const fotoGuardada = localStorage.getItem("fotoPerfil");
	if (fotoGuardada) imgPerfil.src = fotoGuardada;
}

// Historial personal 
async function cargarHistorialUsuario() {
	if (!usuarioActual) {
		resultado.innerHTML = "No hay usuario logueado.";
		return;
	}
	const solicitudes = await getData("solicitudes");
	try {
	} catch {
		resultado.innerHTML = "Error al cargar solicitudes.";
		return;
	}
	// Usar solo el id del usuario logueado
	const idUsuario = usuarioDb?.id;
	const historial = solicitudes.filter(s =>
		s.idEstudiante == idUsuario
	);
	if (historial.length === 0) {
		resultado.innerHTML = "No hay solicitudes para este usuario.";
		return;
	}
	let html = `<table><thead><tr><th>Código</th><th>Fecha Salida</th><th>Fecha Regreso</th><th>Estado</th></tr></thead><tbody>`;
	historial.forEach(s => {
		html += `<tr><td>${s.codigoEquipo || "-"}</td><td>${s.fechaSalida ? new Date(s.fechaSalida).toLocaleDateString() : "-"}</td><td>${s.fechaRegreso ? new Date(s.fechaRegreso).toLocaleDateString() : "-"}</td><td>${s.estado || "-"}</td></tr>`;
	});
	html += `</tbody></table>`;
	resultado.innerHTML = html;
}
