import { getData } from "../services/fetch.js";

const registroconten = document.getElementById("container1");

function showMessage(msg, type = "error") {
    let msgDiv = document.getElementById("msg");
    if (!msgDiv) {
        msgDiv = document.createElement("div");
        msgDiv.id = "msg";
        registroconten.insertBefore(msgDiv, registroconten.lastElementChild);
    }
    msgDiv.innerText = msg;
    msgDiv.className = type;
}


const btninicio = document.getElementById("btninicio");
btninicio.addEventListener("click", async e => {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    if (!name || !pass) {
        showMessage("Completa todos los campos");
        return;
    }


    const users = await getData("usuarios");
    console.log("Usuarios recibidos:", users);
    if (!Array.isArray(users)) {
        showMessage("Error al obtener usuarios del servidor");
        return;
    }
    const current = users.find(u =>
        (
            u.nombre?.toLowerCase() === name.toLowerCase() ||
            u.correo?.toLowerCase() === name.toLowerCase() ||
            u.usuario?.toLowerCase() === name.toLowerCase()
        ) &&
        u.password === pass
    );

    if (current?.tipoUsuario === "estudiante") {
        localStorage.setItem("currentUser", current.usuario);
        showMessage("Inicio de sesión exitoso", "success");
        localStorage.setItem("nombre",current.nombre)
        setTimeout(() => {
            window.location.href = "/pages/solicitud.html";
        }, 1000);
        return;
    }

    if (current?.tipoUsuario === "profesor") {
        localStorage.setItem("currentUser", current.usuario);
        showMessage("Inicio de sesión exitoso", "success");
        setTimeout(() => {
            window.location.href = "/pages/admins.html";
        }, 1000);
        return;
    }

    showMessage("Usuario o contraseña incorrectos");
});
