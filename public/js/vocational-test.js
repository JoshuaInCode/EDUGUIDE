// vocational-test.js
// Lógica del test vocacional interactivo para EduGuide

const questions = [
  {
    question: "¿Qué actividad disfrutas más en tu tiempo libre?",
    options: [
      { text: "Resolver acertijos o problemas matemáticos", type: "analitico" },
      { text: "Ayudar a otros o escuchar sus problemas", type: "social" },
      { text: "Crear arte, música o escribir", type: "artistico" },
      { text: "Liderar equipos o tomar decisiones", type: "liderazgo" },
      { text: "Experimentar con tecnología o computadoras", type: "tecnologico" },
      { text: "Organizar eventos o actividades", type: "organizador" },
      { text: "Investigar temas nuevos", type: "investigador" }
    ]
  },
  {
    question: "¿Cómo prefieres trabajar?",
    options: [
      { text: "En equipo", type: "social" },
      { text: "De forma independiente", type: "investigador" },
      { text: "Liderando proyectos", type: "liderazgo" },
      { text: "Siguiendo instrucciones claras", type: "organizador" },
      { text: "Con flexibilidad y creatividad", type: "artistico" }
    ]
  },
  {
    question: "¿Qué materias escolares disfrutas más?",
    options: [
      { text: "Matemáticas", type: "analitico" },
      { text: "Ciencias", type: "investigador" },
      { text: "Literatura", type: "artistico" },
      { text: "Arte", type: "artistico" },
      { text: "Educación Física", type: "social" },
      { text: "Tecnología", type: "tecnologico" },
      { text: "Ciencias Sociales", type: "social" }
    ]
  },
  {
    question: "¿Qué valoras más en un trabajo?",
    options: [
      { text: "Estabilidad", type: "organizador" },
      { text: "Creatividad", type: "artistico" },
      { text: "Ayudar a otros", type: "social" },
      { text: "Altos ingresos", type: "liderazgo" },
      { text: "Innovación", type: "tecnologico" },
      { text: "Reconocimiento social", type: "liderazgo" }
    ]
  },
  {
    question: "¿Cómo te describirías?",
    options: [
      { text: "Analítico/a", type: "analitico" },
      { text: "Empático/a", type: "social" },
      { text: "Creativo/a", type: "artistico" },
      { text: "Líder", type: "liderazgo" },
      { text: "Organizado/a", type: "organizador" },
      { text: "Curioso/a", type: "investigador" },
      { text: "Práctico/a", type: "tecnologico" }
    ]
  },
  {
    question: "¿Qué problema social te gustaría resolver?",
    options: [
      { text: "Salud", type: "social" },
      { text: "Educación", type: "social" },
      { text: "Medio ambiente", type: "investigador" },
      { text: "Pobreza", type: "liderazgo" },
      { text: "Tecnología", type: "tecnologico" },
      { text: "Justicia", type: "organizador" },
      { text: "Cultura", type: "artistico" }
    ]
  },
  {
    question: "¿Te gustaría trabajar en contacto con personas, datos, objetos o ideas?",
    options: [
      { text: "Personas", type: "social" },
      { text: "Datos", type: "analitico" },
      { text: "Objetos", type: "tecnologico" },
      { text: "Ideas", type: "investigador" }
    ]
  },
  {
    question: "¿Prefieres tareas estructuradas o creativas?",
    options: [
      { text: "Estructuradas", type: "organizador" },
      { text: "Creativas", type: "artistico" },
      { text: "Ambas", type: "liderazgo" }
    ]
  },
  {
    question: "¿Qué te motiva más a la hora de aprender?",
    options: [
      { text: "Resolver problemas", type: "analitico" },
      { text: "Ayudar", type: "social" },
      { text: "Crear", type: "artistico" },
      { text: "Descubrir", type: "investigador" },
      { text: "Competir", type: "liderazgo" },
      { text: "Colaborar", type: "social" }
    ]
  },
  {
    question: "¿En qué ambiente te gustaría trabajar?",
    options: [
      { text: "Oficina", type: "organizador" },
      { text: "Laboratorio", type: "investigador" },
      { text: "Aire libre", type: "tecnologico" },
      { text: "Hospital", type: "social" },
      { text: "Estudio creativo", type: "artistico" },
      { text: "Empresa", type: "liderazgo" },
      { text: "Aula", type: "social" }
    ]
  }
];

const careerMap = {
  analitico: {
    name: "Ingeniería, Finanzas, Estadística, Matemáticas",
    desc: "Carreras que requieren pensamiento lógico, análisis de datos y resolución de problemas. Ejemplo: Ingeniería Civil, Finanzas, Estadística, Matemáticas."
  },
  social: {
    name: "Psicología, Medicina, Educación, Trabajo Social",
    desc: "Carreras orientadas a la ayuda y contacto con personas. Ejemplo: Psicología, Medicina, Educación, Trabajo Social."
  },
  artistico: {
    name: "Diseño, Artes, Comunicación, Publicidad",
    desc: "Carreras creativas y expresivas. Ejemplo: Diseño Gráfico, Artes Plásticas, Comunicación Social, Publicidad."
  },
  liderazgo: {
    name: "Administración, Derecho, Negocios, Emprendimiento",
    desc: "Carreras donde el liderazgo y la toma de decisiones son clave. Ejemplo: Administración de Empresas, Derecho, Negocios Internacionales."
  },
  tecnologico: {
    name: "Ingeniería en Sistemas, Informática, Tecnología",
    desc: "Carreras relacionadas con la innovación y el uso de tecnología. Ejemplo: Ingeniería en Sistemas, Informática, Telecomunicaciones."
  },
  organizador: {
    name: "Contabilidad, Logística, Recursos Humanos",
    desc: "Carreras que requieren organización, planificación y gestión. Ejemplo: Contabilidad, Logística, Recursos Humanos."
  },
  investigador: {
    name: "Ciencias, Investigación, Biología, Química",
    desc: "Carreras científicas y de investigación. Ejemplo: Biología, Química, Física, Investigación Científica."
  }
};

let current = 0;
let answers = [];


const funMessages = [
  "¡Vamos! Descubre algo nuevo sobre ti 🤩",
  "¡Sigue así! Cada respuesta te acerca a tu futuro 🚀",
  "¡Excelente! Tu vocación está más cerca de lo que crees 🎯",
  "¡No te detengas! El siguiente paso puede sorprenderte 🧭",
  "¡Genial! Aprender sobre ti es el primer paso al éxito 🏆"
];

function renderQuestion() {
  const q = questions[current];
  const msg = funMessages[Math.floor(Math.random() * funMessages.length)];
  document.getElementById('questionBox').innerHTML = `<div class='question'>${q.question}</div><div style='color:#2196f3;font-size:1.1rem;margin-bottom:10px;'>${msg}</div>`;
  document.getElementById('optionsBox').innerHTML = q.options.map((opt, i) =>
    `<button class='option-btn' data-idx='${i}' onclick='toggleOption(${i})'>${opt.text}</button>`
  ).join('');
  document.getElementById('nextBtn').style.display = 'none';
  updateProgress();
}



function toggleOption(idx) {
  if (!answers[current]) answers[current] = [];
  const type = questions[current].options[idx].type;
  const btns = document.querySelectorAll('.option-btn');
  const selectedIdx = answers[current].indexOf(type);
  if (selectedIdx === -1) {
    answers[current].push(type);
    btns[idx].classList.add('selected', 'pulse-anim');
    setTimeout(() => btns[idx].classList.remove('pulse-anim'), 500);
  } else {
    answers[current].splice(selectedIdx, 1);
    btns[idx].classList.remove('selected');
  }
  document.getElementById('nextBtn').style.display = answers[current].length > 0 ? 'inline-block' : 'none';
}

document.getElementById('nextBtn').onclick = function() {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
};

function updateProgress() {
  const percent = ((current) / questions.length) * 100;
  document.getElementById('progressBar').style.width = percent + '%';
}

// showResult ahora está en vocational-results.js para incluir gráficas y tablas

function restartTest() {
  current = 0;
  answers = [];
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('test-section').style.display = 'block';
  renderQuestion();
}

// Inicializar
renderQuestion();

// Animación CSS para la selección
const style = document.createElement('style');
style.innerHTML = `
.pulse-anim {
  animation: pulseGrow 0.5s cubic-bezier(.4,2,.3,1);
}
@keyframes pulseGrow {
  0% { box-shadow: 0 0 0 0 #2196f3; transform: scale(1); }
  60% { box-shadow: 0 0 0 16px rgba(33,150,243,0.15); transform: scale(1.08); }
  100% { box-shadow: 0 0 0 0 #2196f3; transform: scale(1); }
}
`;
document.head.appendChild(style);
