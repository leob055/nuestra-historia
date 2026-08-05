// Transición suave entre pantallas
function goToStep(current, next) {
  current.style.opacity = '0';
  current.style.transform = 'scale(0.95)';
  setTimeout(() => {
    current.classList.add('hidden');
    next.classList.remove('hidden');
    // Pequeño retraso para que la animación de entrada se vea
    setTimeout(() => {
      next.style.opacity = '1';
      next.style.transform = 'scale(1)';
    }, 50);
  }, 500);
}

const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

// Iniciar sorpresa
document.getElementById('btn-start').addEventListener('click', () => {
  goToStep(step1, step2);
});

// Abrir la carta (Animación del sobre)
document.getElementById('btn-open-letter').addEventListener('click', function() {
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  
  // Añade la clase que activa el CSS mágico
  envelopeWrapper.classList.add('open');
  
  // Oculta el botón de "Toca para abrir"
  this.style.opacity = '0';
  setTimeout(() => {
    this.style.display = 'none';
  }, 300);
});

// Responder "Sí, quiero" y calcular tiempo
document.getElementById('btn-accept').addEventListener('click', () => {
  goToStep(step2, step3);
  
  // Fecha exacta de inicio: 06 de Mayo de 2026
  const startDate = new Date(2026, 4, 6); // Mes 4 es mayo (0-11)
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

  // Animación simple de conteo numérico
  animateValue("years", 0, years, 1000);
  animateValue("months", 0, months, 1500);
  animateValue("days", 0, days, 2000);
}

// Función extra para que los números suban fluidamente
function animateValue(id, start, end, duration) {
  if (start === end) {
    document.getElementById(id).textContent = end;
    return;
  }
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let obj = document.getElementById(id);
  let timer = setInterval(function() {
    current += increment;
    obj.textContent = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
