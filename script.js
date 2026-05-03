// =========================
// SOBRE CODEPEN PRO
// =========================

document.addEventListener('DOMContentLoaded', () => {

  const seal = document.getElementById('seal');
  const flap = document.getElementById('flap');
  const card = document.getElementById('card');
  const scene = document.getElementById('scene');
  const transitionScreen = document.getElementById('transition-screen');
  const contenido = document.getElementById('contenido');
  const musica = document.getElementById('musicaFondo');

  let animando = false;

  if (!seal) return;

  seal.addEventListener('click', () => {

    if (animando) return;
    animando = true;

    // 1. abrir solapa
    flap.classList.add('is-opening');

    // 2. sacar carta
    setTimeout(() => {
      card.classList.add('is-lifted');
    }, 800);

    // 3. música
    setTimeout(() => {
      if (musica) {
        musica.volume = 0.1;
        musica.play().catch(()=>{});
      }
    }, 1000);

    // 4. zoom escena
    setTimeout(() => {
      scene.classList.add('is-zooming');
    }, 1600);

    // 5. fade blanco
    setTimeout(() => {
      transitionScreen.classList.add('is-fading');
    }, 2200);

    // 6. mostrar contenido
    setTimeout(() => {

      if (scene) scene.remove();
      if (transitionScreen) transitionScreen.remove();

      if (contenido) contenido.classList.add('visible');

      document.body.classList.remove('no-scroll');

      window.scrollTo(0, 0);

    }, 3200);

  });

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

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val.toString().padStart(2, "0");
  };

  set("dias", dias);
  set("horas", horas);
  set("minutos", minutos);
  set("segundos", segundos);
}

setInterval(actualizarCuentaAtras, 1000);


// =========================
// CARRUSEL
// =========================

let indiceCarrusel = 0;

function actualizarCarrusel() {
  const fotos = document.querySelectorAll(".foto-carrusel");
  if (!fotos.length) return;

  fotos.forEach(f => f.classList.remove("activa"));
  fotos[indiceCarrusel].classList.add("activa");
}

function moverCarrusel(direccion) {
  const fotos = document.querySelectorAll(".foto-carrusel");
  if (!fotos.length) return;

  indiceCarrusel = (indiceCarrusel + direccion + fotos.length) % fotos.length;
  actualizarCarrusel();
}


// =========================
// SWIPE MÓVIL
// =========================

window.addEventListener("load", () => {

  actualizarCuentaAtras();
  actualizarCarrusel();

  const carrusel = document.getElementById("carruselFotos");

  if (!carrusel) return;

  let inicioX = 0;

  carrusel.addEventListener("touchstart", (e) => {
    inicioX = e.changedTouches[0].clientX;
  });

  carrusel.addEventListener("touchend", (e) => {
    const finX = e.changedTouches[0].clientX;

    if (inicioX - finX > 40) moverCarrusel(1);
    if (finX - inicioX > 40) moverCarrusel(-1);
  });

});


// =========================
// MÚSICA
// =========================

function controlarMusica() {
  const musica = document.getElementById("musicaFondo");
  const boton = document.getElementById("botonMusica");

  if (!musica) return;

  if (musica.paused) {
    musica.play();
    if (boton) boton.textContent = "❚❚ Pausar";
  } else {
    musica.pause();
    if (boton) boton.textContent = "♫ Música";
  }
}
