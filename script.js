// Transición entre pasos
function goToStep(current, next) {
  current.classList.add('hidden');
  setTimeout(() => {
    next.classList.remove('hidden');
  }, 100);
}

const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

document.getElementById('btn-start').addEventListener('click', () => {
  goToStep(step1, step2);
});

// Desplegar la carta con animación
document.getElementById('btn-open-letter').addEventListener('click', function() {
  const envelope = document.getElementById('envelope-container');
  const letter = document.getElementById('letter-content');
  
  envelope.style.opacity = '0';
  envelope.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    envelope.classList.add('hidden');
    letter.classList.remove('hidden');
  }, 300);
});

// Carrusel de imágenes con soporte para rutas en raíz o en img/
const photos = [
  'foto1.jpg', 'img/foto1.jpg',
  'foto2.jpg', 'img/foto2.jpg',
  'foto3.jpg', 'img/foto3.jpg'
];

let photoIndex = 0;
const carouselImg = document.getElementById('carousel-img');

if (carouselImg) {
  carouselImg.addEventListener('click', () => {
    carouselImg.style.opacity = '0';
    setTimeout(() => {
      photoIndex = (photoIndex + 2) % photos.length;
      carouselImg.src = photos[photoIndex];
      carouselImg.style.opacity = '1';
    }, 200);
  });
}

// Aceptar propuesta y calcular tiempo exacto desde el 06/05/2026
document.getElementById('btn-accept').addEventListener('click', () => {
  goToStep(step2, step3);
  const startDate = new Date(2026, 4, 6); // Mes 4 es mayo en JS
  calculateTime(startDate);
});

function calculateTime(start) {
  const now = new Date();
  
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
}
