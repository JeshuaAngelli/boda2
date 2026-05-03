// file: script.js

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
// CARRUSEL ORIGINAL
// =========================

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

// swipe móvil
let inicioX = 0;
let finX = 0;

const carrusel = document.getElementById("carruselFotos");

if (carrusel) {
  carrusel.addEventListener("touchstart", (e) => {
    inicioX = e.changedTouches[0].clientX;
  });

  carrusel.addEventListener("touchend", (e) => {
    finX = e.changedTouches[0].clientX;

    if (inicioX - finX > 40) moverCarrusel(1);
    else if (finX - inicioX > 40) moverCarrusel(-1);
  });
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

  setTimeout(() => {
    overlay.style.opacity = '0';
    document.body.classList.remove('no-scroll');
  }, 800);

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1500);
}

// =========================
// SOBRE SOLO UNA VEZ
// =========================

window.addEventListener("load", () => {
  if (localStorage.getItem("sobreVisto") === "true") {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
});
