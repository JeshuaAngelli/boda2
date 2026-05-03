// file: script.js

const URL_GOOGLE_SHEETS = "https://script.google.com/macros/s/AKfycbw8ifKayg2Kf3bAiAVTBiIr6fHzhqVKkQtJszHOOZFnP6hcnTK5JZcmkr5Lm8qaICyr/exec";

let codigoValidado = "";

// =========================
// VALIDAR CÓDIGO
// =========================

function validarCodigo() {
  const codigo = document.getElementById("codigoInvitacion").value.trim().toUpperCase();
  const formulario = document.getElementById("formularioAsistencia");
  const mensajeCodigo = document.getElementById("mensajeCodigo");

  const codigosValidos = ["I1","I2","I3","I4","I5","I6","I7","I8","I9","I10"];

  if (codigosValidos.includes(codigo)) {

    if (localStorage.getItem(codigo + "_confirmado") === "true") {
      mensajeCodigo.textContent = "Esta invitación ya ha sido confirmada.";
      formulario.style.display = "none";
      return;
    }

    codigoValidado = codigo;
    mensajeCodigo.textContent = "Código validado correctamente.";
    formulario.style.display = "flex";

  } else {
    mensajeCodigo.textContent = "Código incorrecto.";
    formulario.style.display = "none";
  }
}

// =========================
// CONFIRMAR ASISTENCIA
// =========================

function confirmarAsistencia() {
  const nombre = document.getElementById("nombreInvitado").value.trim();
  const asistentes = document.getElementById("numeroAsistentes").value.trim();
  const intolerancias = document.getElementById("intolerancias").value.trim();
  const mensaje = document.getElementById("mensajeInvitado").value.trim();

  if (!nombre || !asistentes) {
    alert("Completa nombre y asistentes.");
    return;
  }

  const mensajeWhatsApp =
    `Hola, confirmo mi asistencia a la boda de Jeshua & Angelli.\n\n` +
    `Nombre: ${nombre}\n` +
    `Asistentes: ${asistentes}\n` +
    `Intolerancias: ${intolerancias || "Ninguna"}\n` +
    `Mensaje: ${mensaje || "Ninguno"}\n\n`;

  localStorage.setItem(codigoValidado + "_confirmado", "true");

  fetch(URL_GOOGLE_SHEETS, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      codigo: codigoValidado,
      asistentes,
      intolerancias: intolerancias || "Ninguna",
      mensaje: mensaje || "Sin mensaje"
    })
  });

  window.open(`https://wa.me/34638063888?text=${encodeURIComponent(mensajeWhatsApp)}`);
}

// =========================
// CONTADOR
// =========================

function actualizarCuentaAtras() {
  const fechaBoda = new Date("2026-05-30T13:00:00").getTime();
  const ahora = new Date().getTime();
  const diferencia = fechaBoda - ahora;

  if (diferencia <= 0) return;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("dias").textContent = dias.toString().padStart(2,"0");
  document.getElementById("horas").textContent = horas.toString().padStart(2,"0");
  document.getElementById("minutos").textContent = minutos.toString().padStart(2,"0");
  document.getElementById("segundos").textContent = segundos.toString().padStart(2,"0");
}

setInterval(actualizarCuentaAtras, 1000);

// =========================
// MÚSICA
// =========================

function controlarMusica() {
  const musica = document.getElementById("musicaFondo");
  const boton = document.getElementById("botonMusica");

  if (!musica) return;

  musica.volume = 0.1;

  if (musica.paused) {
    musica.play();
    boton.textContent = "❚❚ Pausar";
  } else {
    musica.pause();
    boton.textContent = "♫ Música";
  }
}

// =========================
// CARRUSEL PRO
// =========================

let indiceCarrusel = 0;

function actualizarCarrusel() {
  const fotos = document.querySelectorAll(".foto-carrusel");
  if (!fotos.length) return;

  fotos.forEach(f => f.classList.remove("activa","anterior","siguiente"));

  const total = fotos.length;
  const anterior = (indiceCarrusel - 1 + total) % total;
  const siguiente = (indiceCarrusel + 1) % total;

  fotos[indiceCarrusel].classList.add("activa");
  fotos[anterior].classList.add("anterior");
  fotos[siguiente].classList.add("siguiente");
}

function moverCarrusel(dir) {
  const fotos = document.querySelectorAll(".foto-carrusel");
  if (!fotos.length) return;

  indiceCarrusel = (indiceCarrusel + dir + fotos.length) % fotos.length;
  actualizarCarrusel();
}

// =========================
// SOBRE + SONIDO
// =========================

function abrirSobre() {
  const sobre = document.querySelector('.envelope');
  const overlay = document.getElementById('overlay');
  const sonido = document.getElementById('sonidoSobre');
  const musica = document.getElementById('musicaFondo');

  if (!sobre || !overlay) return;

  sobre.classList.add('abierto');

  if (sonido) {
    sonido.volume = 0.5;
    sonido.play().catch(()=>{});
  }

  setTimeout(() => {
    if (musica) {
      musica.volume = 0.1;
      musica.play().catch(()=>{});
    }
  }, 600);

  localStorage.setItem("sobreVisto","true");

  setTimeout(() => {
    overlay.style.opacity = '0';
    document.body.classList.remove('no-scroll');
  }, 800);

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1600);
}

// =========================
// INIT SEGURO
// =========================

window.addEventListener("load", () => {

  actualizarCuentaAtras();
  actualizarCarrusel();

  // sobre solo una vez
  if (localStorage.getItem("sobreVisto") === "true") {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  }

  // swipe carrusel
  const carrusel = document.getElementById("carruselFotos");

  if (carrusel) {
    let inicioX = 0;

    carrusel.addEventListener("touchstart", e => {
      inicioX = e.changedTouches[0].clientX;
    });

    carrusel.addEventListener("touchend", e => {
      const finX = e.changedTouches[0].clientX;

      if (inicioX - finX > 40) moverCarrusel(1);
      if (finX - inicioX > 40) moverCarrusel(-1);
    });
  }

  // auto slider
  setInterval(() => moverCarrusel(1), 4000);

});
