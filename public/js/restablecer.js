(function() {
  emailjs.init({ publicKey: "yaNVXGQKwld3JnIwK" }); 
})();

/* Generar aleatorio para recuperación */
function generateToken() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/* Envía el correo de recuperación con el token */
function sendRecovery() {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Por favor ingresa tu correo");
    return;
  }

  const token = generateToken();
  const link = `aaaaa`; 
  /* Envía el correo usando emailjs */
  emailjs.send("service_mqp2a4u", "template_m0bnnew", {
    to_email: email,
    token: token,
    link: link,
    email: email
  })
  .then(() => {
    alert("¡Correo de recuperación enviado!");
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Hubo un error al enviar el correo.");
  });
}

document.getElementById("btnEnviar").addEventListener("click", sendRecovery);
