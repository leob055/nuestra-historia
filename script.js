// Navegación entre pasos
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

document.getElementById('btn-start').addEventListener('click', () => {
  step1.classList.add('hidden');
  step2.classList.remove('hidden');
});

// Desplegar la carta
document.getElementById('btn-open-letter').addEventListener('click', function() {
  document.getElementById('letter-content').classList.remove('hidden');
  this.parentElement.classList.add('hidden'); // oculta el sobre
});

// Carrusel de imágenes simple
const photos = ['img/foto1.jpg', 'img/foto2.jpg', 'img/foto3.jpg'];
let currentPhoto = 0;
const carouselImg = document.getElementById('carousel-img');

if (carouselImg) {
  carouselImg.addEventListener('click', () => {
    currentPhoto = (currentPhoto + 1) % photos.length;
    carouselImg.src = photos[currentPhoto];
  });
}

// Aceptar propuesta y calcular contador
document.getElementById('btn-accept').addEventListener('click', () => {
  step2.classList.add('hidden');
  step3.classList.remove('hidden');
  
  // Cambia esta fecha por la fecha en que empezaron a salir/conocerse (Año, Mes-1, Día)
  // Nota: Los meses en JavaScript van de 0 (enero) a 11 (diciembre)
  const startDate = new Date(2023, 9, 13); // Ejemplo: 13 de octubre de 2023
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