/**
 * REDIRECCIÓN FINAL
 */
const TARGET_URL = 'https://tu-pagina-de-boda.com/inicio';

document.addEventListener('DOMContentLoaded', () => {
    
    const seal = document.getElementById('seal');
    const flapWrapper = document.getElementById('flap');
    const card = document.getElementById('card');
    const scene = document.getElementById('scene');
    const transitionScreen = document.getElementById('transition-screen');

    let isAnimating = false;

    seal.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        // 1. [0ms] Abre la solapa derecha en 3D
        flapWrapper.classList.add('is-opening');

        // 2. [800ms] SACA LA TARJETA: Aquí ocurre la magia del Z-Index.
        // La tarjeta pasa a z-index 20 y se desliza físicamente por sobre las solapas
        setTimeout(() => {
            card.classList.add('is-lifted');
        }, 800);

        // 3. [1550ms] Inicia el zoom hacia la tarjeta blanca ya extraída
        setTimeout(() => {
            scene.classList.add('is-zooming');
        }, 1550);

        // 4. [2200ms] Fundido blanco suave
        setTimeout(() => {
            transitionScreen.classList.add('is-fading');
        }, 2200);

        // 5. [3300ms] Redirección
        setTimeout(() => {
            // Elimina los comentarios para habilitarlo en la web real:
            // window.location.href = TARGET_URL;
            
            console.log('Secuencia terminada. Redirigiendo a:', TARGET_URL);
        }, 3300);
    });
});
// 🔥 SOBRE
document.body.classList.add("no-scroll");

const sobre = document.getElementById("sobre");
const wrapper = document.getElementById("envelope-wrapper");
const musica = document.getElementById("musicaFondo");

sobre.addEventListener("click", () => {

  // abrir sobre
  sobre.classList.add("open");

  // música
  if (musica) {
    musica.volume = 0.3;
    musica.play().catch(()=>{});
  }

  // cerrar overlay
  setTimeout(() => {
    wrapper.style.opacity = "0";
    wrapper.style.transition = "opacity 0.6s ease";
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
      wrapper.style.display = "none";
    }, 600);

  }, 900);
});


// 🔥 CONTADOR
function actualizarCuentaAtras() {
  const fechaBoda = new Date(2026, 4, 30, 13, 0, 0).getTime();
  const ahora = new Date().getTime();
  const diferencia = fechaBoda - ahora;

  if (diferencia <= 0) {
    ["dias","horas","minutos","segundos"].forEach(id=>{
      document.getElementById(id).textContent = "0";
    });
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencia / 1000) % 60);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

setInterval(actualizarCuentaAtras, 1000);
actualizarCuentaAtras();


// 🔥 CARRUSEL
let indiceCarrusel = 0;

function actualizarCarrusel() {
  const fotos = document.querySelectorAll(".foto-carrusel");

  fotos.forEach(f => {
    f.classList.remove("activa", "anterior", "siguiente");
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


// 🔥 SWIPE
let inicioX = 0;
let finX = 0;

const carrusel = document.getElementById("carruselFotos");

if (carrusel) {
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
}
