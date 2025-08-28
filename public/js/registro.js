
import { postData } from "../services/fetch.js";

const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const confirmar = document.getElementById("confirmar");
const btnregis = document.getElementById("button");
const registroconten = document.getElementById("container2");
const telefono = document.getElementById("Telefono");
function showMessage(msg, type = "error") {
    let msgDiv = document.getElementById("msg");
    if (!msgDiv) {
        msgDiv = document.createElement("div");
        msgDiv.id = "msg";
        msgDiv.style.margin = "10px 0";
        registroconten.insertBefore(msgDiv, registroconten.lastElementChild);
    }
    msgDiv.style.color = type === "error" ? "red" : "green";
    msgDiv.innerText = msg;
}
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
btnregis?.addEventListener("click", async e => {
    e.preventDefault();
    const nombreVal = nombre?.value.trim();
    const correoVal = correo?.value.trim();
    const usuarioVal = usuario?.value.trim();
    const passwordVal = password?.value;
    const confirmarVal = confirmar?.value;
    const telefonoVal = telefono?.value.trim();
    if (!nombreVal || !correoVal || !usuarioVal || !passwordVal || !confirmarVal || !telefonoVal) {
        showMessage("Todos los campos son obligatorios");
        return;
    }
    if (!validateEmail(correoVal)) {
        showMessage("El correo no es válido");
        return;
    }
    if (passwordVal.length < 6) {
        showMessage("La contraseña debe tener al menos 6 caracteres");
        return;
    }
    if (passwordVal !== confirmarVal) {
        showMessage("Las contraseñas no coinciden");
        return;
    }
    const users = getUsers();
    if (users.some(u => u.usuario.toLowerCase() === usuarioVal.toLowerCase())) {
        showMessage("El nombre de usuario ya existe");
        return;
    }
    if (users.some(u => u.correo.toLowerCase() === correoVal.toLowerCase())) {
        showMessage("El correo ya está registrado");
        return;
    }
    const usu = {
        nombre: nombreVal,
        correo: correoVal,
        usuario: usuarioVal,
        password: passwordVal,
        telefono: telefonoVal,
        tipoUsuario: "estudiante"
    };
    let respuesta;
    try {
        respuesta = await postData(usu, "usuarios");
    } catch {
        showMessage("Error al registrar usuario");
        return;
    }
    users.push(usu);
    saveUsers(users);
    showMessage("Puedes iniciar sesión.", "success");
    if(nombre) nombre.value = "";
    if(correo) correo.value = "";
    if(usuario) usuario.value = "";
    if(password) password.value = "";
    if(confirmar) confirmar.value = "";
    if(telefono) telefono.value = "";
});