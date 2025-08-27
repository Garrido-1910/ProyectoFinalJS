import { postData } from "../services/fetch.js";
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const confirmar = document.getElementById("confirmar");
const btnregis = document.getElementById("button");
const registroconten = document.getElementById("container2");
const telefono = document.getElementById("Telefono");

/* Mostrar mensajes al usuario */
function showMessage(msg, type = "error") {
    let msgDiv = document.getElementById("msg");
    if (!msgDiv) {
        msgDiv = document.createElement("div");
        msgDiv.id = "msg";
        msgDiv.style.margin = "10px 0";
        registroconten.insertBefore(msgDiv, registroconten.children[registroconten.children.length - 1]);
    }
    msgDiv.style.color = type === "error" ? "red" : "green";
    msgDiv.innerText = msg;
}

/* Validar formato de correo electrónico */
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

/* Obtener usuarios del localStorage */
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

/* Guardar usuarios en el localStorage */
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

/* Evento click del botón de registro */
btnregis.addEventListener("click", async function (e) {
    e.preventDefault();

    /* Elimina espacios extra en los valores */
    const nombreVal = nombre.value.trim();
    const correoVal = correo.value.trim();
    const usuarioVal = usuario.value.trim();
    const passwordVal = password.value;
    const confirmarVal = confirmar.value;
    const telefonoVal = telefono.value.trim();

    /* Validar que los campos existen y tienen valor */
    if (!nombreVal || !correoVal || !usuarioVal || !passwordVal || !confirmarVal || !telefonoVal) {
        showMessage("Todos los campos son obligatorios.");
        return;
    }

    if (!validateEmail(correoVal)) {
        showMessage("El correo no es válido.");
        return;
    }

    if (passwordVal.length < 6) {
        showMessage("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    if (passwordVal !== confirmarVal) {
        showMessage("Las contraseñas no coinciden.");
        return;
    }

    const users = getUsers();

    if (users.some(u => u.usuario.toLowerCase() === usuarioVal.toLowerCase())) {
        showMessage("El nombre de usuario ya existe.");
        return;
    }
    if (users.some(u => u.correo.toLowerCase() === correoVal.toLowerCase())) {
        showMessage("El correo ya está registrado.");
        return;
    }

    /* Guardar el nuevo usuario */
const usu = {
    nombre: nombre.value.trim(),
    correo: correo.value.trim(),
    usuario: usuario.value.trim(),
    password: password.value,
    telefono: telefono.value.trim()
};

const respuesta = await postData(usu, "usuarios");
console.log("Servidor respondió:", respuesta);
    /* 
        Crear un objeto que se llame usuario

        El obj va a tener las propiedades y valores de cada uno de los usuarios

        Luego crear una variable  que haga uso de la funcion postData, por 
        parametro pasarle - El nombre del endpoint y el objeto
    */

    users.push({
        nombre: nombreVal,
        correo: correoVal,
        usuario: usuarioVal,
        password: passwordVal,
        telefono: telefonoVal 
    });
    saveUsers(users);

    showMessage("¡Registro exitoso! Ahora puedes iniciar sesión.", "success");

    nombre.value = "";
    correo.value = "";
    usuario.value = "";
    password.value = "";
    confirmar.value = "";
    telefono.value = "";

    /* Redirigir automático */
    setTimeout(() => {
        window.location.href = "iniciosecion.html";
    }, 1200);
});