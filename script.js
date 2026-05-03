const URL_GOOGLE_SHEETS = "https://script.google.com/macros/s/AKfycbw8ifKayg2Kf3bAiAVTBiIr6fHzhqVKkQtJszHOOZFnP6hcnTK5JZcmkr5Lm8qaICyr/exec";

let codigoValidado = "";

function validarCodigo() {
  const codigo = document.getElementById("codigoInvitacion").value.trim().toUpperCase();
  const formulario = document.getElementById("formularioAsistencia");
  const mensajeCodigo = document.getElementById("mensajeCodigo");

  const codigosValidos = ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10"];

  if (codigosValidos.includes(codigo)) {
    if (localStorage.getItem(codigo + "_confirmado") === "true") {
      mensajeCodigo.textContent = "Esta invitación ya ha sido confirmada.";
      formulario.style.display = "none";
      return;
    }

    codigoValidado = codigo;
    mensajeCodigo.textContent = "Código validado correctamente. Ya puedes confirmar tu asistencia.";
    formulario.style.display = "flex";
  } else {
    mensajeCodigo.textContent = "Código incorrecto. Revisa tu invitación.";
    formulario.style.display = "none";
  }
}

function confirmarAsistencia() {
  const nombre = document.getElementById("nombreInvitado").value.trim();
  const asistentes = document.getElementById("numeroAsistentes").value.trim();
  const intolerancias = document.getElementById("intolerancias").value.trim();
  const mensaje = document.getElementById("mensajeInvitado").value.trim();

  if (nombre === "" || asistentes === "") {
    alert("Por favor, indica tu nombre y el número de asistentes.");
    return;
  }

  const mensajeWhatsApp =
    `Hola, confirmo mi asistencia a la boda de Luis & Carolina.\n\n` +
    `Nombre: ${nombre}\n` +
    `Asistentes: ${asistentes}\n` +
    `Intolerancias o alergias: ${intolerancias || "Ninguna"}\n` +
    `Mensaje para los novios: ${mensaje || "Sin mensaje adicional"}\n\n` +
    `¡Nos vemos el gran día!`;

localStorage.setItem(codigoValidado + "_confirmado", "true");

fetch(URL_GOOGLE_SHEETS, {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify({
    codigo: codigoValidado,
    asistentes: asistentes,
    intolerancias: intolerancias || "Ninguna",
    mensaje: mensaje || "Sin mensaje adicional"
  })
});

  window.open(`https://wa.me/34638063888?text=${encodeURIComponent(mensajeWhatsApp)}`, "_blank");
}
// file: script.js

function actualizarCuentaAtras() {
  const fechaBoda = new Date("2026-05-30T13:00:00").getTime();
  const ahora = new Date().getTime();
  const diferencia = fechaBoda - ahora;

  if (diferencia <= 0) {
    document.getElementById("dias").textContent = "0";
    document.getElementById("horas").textContent = "0";
    document.getElementById("minutos").textContent = "0";
    document.getElementById("segundos").textContent = "0";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
  document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
  document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
  document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
}

actualizarCuentaAtras();
setInterval(actualizarCuentaAtras, 1000);

function borrarConfirmacion() {
  localStorage.removeItem("FRANCIFAM_confirmado");
  alert("Confirmación borrada. Ya puedes volver a probar.");
}

function controlarMusica() {
  const musica = document.getElementById("musicaFondo");
  const boton = document.getElementById("botonMusica");
  
  musica.volume = 0.10;

  if (musica.paused) {
    musica.play();
    boton.textContent = "❚❚ Pausar";
  } else {
    musica.pause();
    boton.textContent = "♫ Música";
  }
}

let indiceCarrusel = 0;

function actualizarCarrusel() {
  const fotos = document.querySelectorAll(".foto-carrusel");

  fotos.forEach((foto) => {
    foto.classList.remove("activa", "anterior", "siguiente");
  });

  const total = fotos.length;
  const anterior = (indiceCarrusel - 1 + total) % total;
  const siguiente = (indiceCarrusel + 1) % total;

  fotos[indiceCarrusel].classList.add("activa");
  fotos[anterior].classList.add("anterior");
  fotos[siguiente].classList.add("siguiente");
}

function moverCarrusel(direccion) {
  const fotos = document.querySelectorAll(".foto-carrusel");
  indiceCarrusel = (indiceCarrusel + direccion + fotos.length) % fotos.length;
  actualizarCarrusel();
}

actualizarCarrusel();

let inicioX = 0;
let finX = 0;

const carrusel = document.getElementById("carruselFotos");

carrusel.addEventListener("touchstart", (e) => {
  inicioX = e.changedTouches[0].clientX;
});

carrusel.addEventListener("touchend", (e) => {
  finX = e.changedTouches[0].clientX;

  if (inicioX - finX > 40) {
    moverCarrusel(1);
  } else if (finX - inicioX > 40) {
    moverCarrusel(-1);
  }
});
