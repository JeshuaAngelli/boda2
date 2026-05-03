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
// CARRUSEL PRO (SEGURO)
// =========================

let indiceCarrusel = 0;

function actualizarCarrusel() {
  const fotos = document.querySelectorAll(".foto-carrusel");

  if (!fotos.length) return;

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

  if (!fotos.length) return;

  indiceCarrusel = (indiceCarrusel + direccion + fotos.length) % fotos.length;
  actualizarCarrusel();
}

// =========================
// SOBRE + SONIDO + SCROLL FIX
// =========================

function abrirSobre() {
  const sobre = document.querySelector('.envelope');
  const overlay = document.getElementById('overlay');
  const sonido = document.getElementById('sonidoSobre');
  const musica = document.getElementById('musicaFondo');

  if (!sobre || !overlay) return;

  sobre.classList.add('abierto');

  // guardar estado
  localStorage.setItem("sobreVisto", "true");

  // sonido sobre
  if (sonido) {
    sonido.volume = 0.5;
    sonido.play().catch(()=>{});
  }

  // música
  setTimeout(() => {
    if (musica) {
      musica.volume = 0.1;
      musica.play().catch(()=>{});
    }
  }, 600);

  // fade overlay
  setTimeout(() => {
    overlay.style.opacity = '0';
    document.body.classList.remove('no-scroll');
  }, 800);

  // ocultar overlay + scroll top
  setTimeout(() => {
    overlay.style.display = 'none';
    window.scrollTo(0, 0);
  }, 1500);
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

    carrusel.addEventListener("touchstart", (e) => {
      inicioX = e.changedTouches[0].clientX;
    });

    carrusel.addEventListener("touchend", (e) => {
      const finX = e.changedTouches[0].clientX;

      if (inicioX - finX > 40) moverCarrusel(1);
      if (finX - inicioX > 40) moverCarrusel(-1);
    });
  }

  // auto slide (opcional)
  setInterval(() => {
    moverCarrusel(1);
  }, 4000);

});
