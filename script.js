// Transición suave entre pantallas
function goToStep(current, next) {
  current.style.opacity = '0';
  current.style.transform = 'scale(0.95)';
  setTimeout(() => {
    current.classList.add('hidden');
    next.classList.remove('hidden');
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
  envelopeWrapper.classList.add('open');
  
  this.style.opacity = '0';
  setTimeout(() => {
    this.style.display = 'none';
  }, 300);
});

// Responder "Sí, quiero"
document.getElementById('btn-accept').addEventListener('click', () => {
  goToStep(step2, step3);
  
  // Fijamos los valores exactos requeridos: 0 años, 3 meses, 0 días
  animateValue("years", 0, 0, 500);
  animateValue("months", 0, 3, 1200);
  animateValue("days", 0, 0, 500);

  // Iniciar lluvia de corazones minimalistas
  createHeartRain();
});

// Animación numérica fluida
function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  if (start === end) {
    obj.textContent = end;
    return;
  }
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let timer = setInterval(function() {
    current += increment;
    obj.textContent = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Lógica para la lluvia de corazones
function createHeartRain() {
  const hearts = ['🩶', '💖', '✨', '🤍'];
  
  // Genera corazones continuamente por 6 segundos
  const interval = setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart-fall');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Posición horizontal, tamaño y velocidad aleatoria
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 12 + 12 + 'px';
    
    document.body.appendChild(heart);
    
    // Elimina el elemento del DOM al terminar la animación
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }, 200);

  // Detener la creación continua tras 6 segundos
  setTimeout(() => {
    clearInterval(interval);
  }, 6000);
}
