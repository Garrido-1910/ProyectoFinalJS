const registroconten = document.getElementById("container1");

/* Función para mostrar mensajes al usuario */
function showMessage(msg, type = "error") {
    let msgDiv = document.getElementById("msg");
    if (!msgDiv) {
        msgDiv = document.createElement("div");
        msgDiv.id = "msg";
        registroconten.insertBefore(msgDiv, registroconten.children[registroconten.children.length - 1]);
    }
    msgDiv.innerText = msg;
}

/* Validar formato de correo electrónico (no se usa aquí pero podría servir)*/
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

/* Obtener usuarios del localStorage */
function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

/* Evento click del botón de inicio de sesión */
const btninicio = document.getElementById("btninicio");
btninicio.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (!name || !pass) {
        showMessage("completa todos los campos");
        return;
    }

    const users = getUsers();

    /* Permite iniciar sesión con usuario o correo y su contraseña */
    const user = users.find(u =>
        (u.usuario.toLowerCase() === name.toLowerCase() || u.correo.toLowerCase() === name.toLowerCase()) &&
        u.password === pass
    );

    if (!user) {
        showMessage("Usuario o contraseña incorrectos");
        return;
    }

    /* Guardar en localStorage el usuario */
    localStorage.setItem('currentUser', user.usuario);

    showMessage("inicio de sesion exitoso", "success");
    setTimeout(() => {
        window.location.href = "solicitud.html";
    }, 1200);
});