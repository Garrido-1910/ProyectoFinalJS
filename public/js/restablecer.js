import { getData } from "../services/fetch.js";

(function() {
  emailjs.init({ publicKey: "yaNVXGQKwld3JnIwK"}); 
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
  let usuariosRegistrados = [];
  try {
    usuariosRegistrados = await getData("usuarios");
  } catch {
    alert("Error al consultar usuarios");
    return;
  }
  const estaRegistrado = usuariosRegistrados.some((correoUsuario) => correoUsuario.correo === email);
  if (!estaRegistrado) {
    alert("Cuenta no registrada");
    return;
  }
  const token = generateToken();
  const link = `aaaaa`;
  try {
    await emailjs.send("service_mqp2a4u", "template_m0bnnew", {
      to_email: email,
      token: token,
      link: link,
      email: email
    });
    alert("¡Correo de recuperación enviado!");
  } catch (err) {
    console.error("Error:", err);
    alert("Hubo un error al enviar el correo.");
  }
}

document.getElementById("btnEnviar").addEventListener("click", sendRecovery);
