// =========================
// SOBRE CODEPEN + REVELACIÓN PERFECTA
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

    // 1. abrir sobre
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

    // 4. zoom
    setTimeout(() => {
      scene.classList.add('is-zooming');
    }, 1600);

    // 5. fade blanco
    setTimeout(() => {
      transitionScreen.classList.add('is-fading');
    }, 2200);

    // =========================
    // 🔥 REVELACIÓN FINAL REAL
    // =========================
    setTimeout(() => {

      // quitar sobre COMPLETAMENTE
      if (scene) scene.remove();
      if (transitionScreen) transitionScreen.remove();

      // mostrar contenido
      if (contenido) {
        contenido.classList.add('visible');
      }

      // desbloquear scroll
      document.body.classList.remove('no-scroll');

      // ir arriba SIEMPRE
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

  document.getElementById("dias").textContent = dias.toString().padStart(2,"0");
  document.getElementById("horas").textContent = horas.toString().padStart(2,"0");
  document.getElementById("minutos").textContent = minutos.toString().padStart(2,"0");
  document.getElementById("segundos").textContent = segundos.toString().padStart(2,"0");
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

function moverCarrusel(dir) {
  const fotos = document.querySelectorAll(".foto-carrusel");
  if (!fotos.length) return;

  indiceCarrusel = (indiceCarrusel + dir + fotos.length) % fotos.length;
  actualizarCarrusel();
}


// =========================
// MÚSICA
// =========================

function controlarMusica() {
  const musica = document.getElementById("musicaFondo");
  if (!musica) return;

  if (musica.paused) musica.play();
  else musica.pause();
}
