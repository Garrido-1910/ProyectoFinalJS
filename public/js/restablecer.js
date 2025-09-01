import { getData, patchData } from "../services/fetch.js";

(function() {
  emailjs.init({ publicKey: "8bN0QIk-kbTdEAy6x"}); 
})();

/* Generar aleatorio para recuperación */
function generateToken() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/* Envía el correo de recuperación con el token */
async function sendRecovery() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Por favor ingresa tu correo");
    return;
  }

  const usuariosRegistrados = await getData("usuarios");

  const estaRegistrado = usuariosRegistrados.some((correoUsuario)=>correoUsuario.correo === email)

  if (!estaRegistrado) {
      alert("Cuenta no registrada")
      return
  }
  const idUsuario = usuariosRegistrados.find((usuario) => usuario.correo === email).id;
  console.log(idUsuario);
  localStorage.setItem("idUsuario", idUsuario);
  const token = generateToken();
  const link = `http://localhost:3000/pages/restablecer.html`; 
  /* Envía el correo usando emailjs */
  emailjs.send("service_gn1q517", "template_tsm82ra", {
    to_email: email,
    token: token,
    link: link,
    email: email
  })
  .then(async() => {
    alert("¡Correo de recuperación enviado!");
    await patchData({ token: token }, "usuarios", idUsuario);
    localStorage.setItem("token", token);
    setTimeout(() => {
        window.location.href = "../pages/nuevaContra.html"
    }, 500);
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Hubo un error al enviar el correo.");
  });
}

document.getElementById("btnEnviar").addEventListener("click", sendRecovery);

  document.getElementById("btnConfirmar").addEventListener("click", function() {
    window.location.href = "iniciosesion.html";
  });
