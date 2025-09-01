import { getData, patchData } from "../services/fetch.js";

const nuevaContra = document.getElementById("nuevaContrasena");
const repetirContra = document.getElementById("repetirContrasena");
const codigoRecuperacion = document.getElementById("codigoRecuperacion");
const btnConfirmar = document.getElementById("btnConfirmar");

function validarCodigo() {
    if (codigoRecuperacion.value === localStorage.getItem("token")) {
        return true
    }
    return false
}

btnConfirmar.addEventListener("click", async () => {
    if (validarCodigo()) {
        await patchData({ password: nuevaContra.value }, "usuarios", localStorage.getItem("idUsuario"));
        alert("Contraseña actualizada con éxito");
        await patchData({ token: "" }, "usuarios", localStorage.getItem("idUsuario"));
        localStorage.removeItem("token");
        localStorage.removeItem("idUsuario");
        setTimeout(() => {
            window.location.href = "../pages/login.html"
        }, 500);
    } else {
        alert("Código de recuperación incorrecto");
    }
});
