// file: script.js

document.addEventListener('DOMContentLoaded', () => {

  // =========================
  // ELEMENTOS SOBRE CODEPEN
  // =========================

  const seal = document.getElementById('seal');
  const flap = document.getElementById('flap');
  const card = document.getElementById('card');
  const scene = document.getElementById('scene');
  const transitionScreen = document.getElementById('transition-screen');

  const musica = document.getElementById('musicaFondo');
  const sonido = document.getElementById('sonidoSobre');

  let animando = false;

  if (seal) {
    seal.addEventListener('click', () => {

      if (animando) return;
      animando = true;

      // 🔊 sonido sobre
      if (sonido) {
        sonido.volume = 0.5;
        sonido.play().catch(()=>{});
      }

      // 1. abrir solapa
      flap.classList.add('is-opening');

      // 2. sacar carta
      setTimeout(() => {
        card.classList.add('is-lifted');
      }, 800);

      // 🎵 música
      setTimeout(() => {
        if (musica) {
          musica.volume = 0.1;
          musica.play().catch(()=>{});
        }
      }, 1000);

      // 3. zoom escena
      setTimeout(() => {
        scene.classList.add('is-zooming');
      }, 1600);

      // 4. fade blanco
      setTimeout(() => {
        transitionScreen.classList.add('is-fading');
      }, 2200);

      // 5. MOSTRAR TU WEB (FIX IMPORTANTE)
      setTimeout(() => {
        transitionScreen.style.display = "none";
        scene.style.display = "none"; // 🔥 oculta el sobre

        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
      }, 3500);

    });
  }

});


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
// MÚSICA BOTÓN
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
// CARRUSEL (ESTABLE)
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
// INIT GENERAL
// =========================

window.addEventListener("load", () => {

  actualizarCuentaAtras();
  actualizarCarrusel();

  // swipe móvil
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

});
