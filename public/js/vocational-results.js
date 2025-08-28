// vocational-results.js
// Lógica para mostrar resultados con gráficas y tablas en el test vocacional

// Requiere Chart.js (CDN)


// Universidades por tipo de carrera (ejemplo, puedes expandirlo)
const universitiesByType = {
  analitico: ["Universidad Tecnológica de Panamá", "Universidad de Panamá"],
  social: ["Universidad de Panamá", "Universidad Latina de Panamá"],
  artistico: ["Universidad de Panamá", "Universidad del Arte Ganexa"],
  liderazgo: ["Universidad Interamericana de Panamá", "Universidad Latina de Panamá"],
  tecnologico: ["Universidad Tecnológica de Panamá", "Universidad Interamericana de Panamá"],
  organizador: ["Universidad de Panamá", "Universidad Latina de Panamá"],
  investigador: ["Universidad de Panamá", "Universidad Tecnológica de Panamá"]
};

function showResult() {
  document.getElementById('test-section').style.display = 'none';
  const counts = {};
  answers.forEach(arr => {
    if (Array.isArray(arr)) arr.forEach(type => { counts[type] = (counts[type] || 0) + 1; });
  });
  // Top 2 tipos
  const sortedTypes = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const topTypes = sortedTypes.slice(0, 2);
  const result = careerMap[topTypes[0]];

  // Universidades recomendadas
  let universidades = [];
  topTypes.forEach(type => {
    if (universitiesByType[type]) universidades = universidades.concat(universitiesByType[type]);
  });
  universidades = [...new Set(universidades)];

  // Construir tabla comparativa
  let tableRows = Object.keys(careerMap).map(type =>
    `<tr><td>${careerMap[type].name.split(',')[0]}</td><td>${counts[type] || 0}</td></tr>`
  ).join('');

  // Guardar resultado en localStorage
  const fecha = new Date().toLocaleString();
  const testResult = {
    fecha,
    topTypes,
    resultName: result.name,
    resultDesc: result.desc,
    counts,
    universidades
  };
  let history = JSON.parse(localStorage.getItem('vocationalResults') || '[]');
  history.push(testResult);
  localStorage.setItem('vocationalResults', JSON.stringify(history));

  // Contenido de resultado
  document.getElementById('result-section').innerHTML = `
    <div class='result-title'>¡Resultado del Test Vocacional!</div>
    <div class='result-career'>${result.name}</div>
    <div class='result-desc'>${result.desc}</div>
    <canvas id='resultChart' height='120'></canvas>
    <div class='mt-4'>
      <table class='table table-bordered table-sm' style='max-width:400px;margin:20px auto;'>
        <thead><tr><th>Área</th><th>Puntaje</th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <div class='mt-4 mb-3'>
      <h5 class='mb-2' style='color:#1769aa;'>Universidades recomendadas</h5>
      <ul style='max-width:400px;margin:0 auto;padding-left:0;list-style:none;'>
        ${universidades.map(u => `<li style='margin-bottom:6px;'><i class='fas fa-university me-2' style='color:#2196f3;'></i>${u}</li>`).join('')}
      </ul>
    </div>
    <div class='d-flex flex-column flex-md-row gap-2 justify-content-center'>
      <button class='btn btn-secondary btn-restart' onclick='restartTest()'>Volver a intentar</button>
      <button class='btn btn-success' id='finishAttemptBtn'>Finalizar intento</button>
    </div>
    <div class='mt-4 text-start' style='font-size:0.95rem;color:#888;'>
      <b>Fuentes:</b> Holland, J. L. (1997). Making Vocational Choices. Super, D. E. (1990). A life-span, life-space approach to career development. Brown, D. (2002). Career Choice and Development. Deci & Ryan (2000). Self-Determination Theory. Universidades de Panamá, UTP, U. Latina, UNESCO.
    </div>
  `;
  document.getElementById('result-section').style.display = 'block';

  // Redirección segura al dashboard
  setTimeout(() => {
    const btn = document.getElementById('finishAttemptBtn');
    if (btn) {
      btn.onclick = () => {
        window.location.href = "dashboard.html";
      };
    }
    // Mostrar gráfica
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: Object.keys(careerMap).map(type => careerMap[type].name.split(',')[0]),
        datasets: [{
          label: 'Tus habilidades',
          data: Object.keys(careerMap).map(type => counts[type] || 0),
          backgroundColor: 'rgba(33,150,243,0.2)',
          borderColor: '#1769aa',
          pointBackgroundColor: '#2196f3',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { r: { angleLines: { display: false }, suggestedMin: 0, suggestedMax: Math.max(...Object.values(counts), 3) } }
      }
    });
  }, 100);
}
