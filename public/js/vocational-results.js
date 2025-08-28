// vocational-results.js
// Lógica para mostrar resultados con gráficas y tablas en el test vocacional

// Requiere Chart.js (CDN)

function showResult() {
  document.getElementById('test-section').style.display = 'none';
  const counts = {};
  answers.forEach(type => { counts[type] = (counts[type] || 0) + 1; });
  const topType = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  const result = careerMap[topType];

  // Construir tabla comparativa
  let tableRows = Object.keys(careerMap).map(type =>
    `<tr><td>${careerMap[type].name.split(',')[0]}</td><td>${counts[type] || 0}</td></tr>`
  ).join('');

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
    <button class='btn-restart' onclick='restartTest()'>Volver a intentar</button>
    <div class='mt-4 text-start' style='font-size:0.95rem;color:#888;'>
      <b>Fuentes:</b> Holland, J. L. (1997). Making Vocational Choices. Super, D. E. (1990). A life-span, life-space approach to career development. Brown, D. (2002). Career Choice and Development. Deci & Ryan (2000). Self-Determination Theory. Universidades de Panamá, UTP, U. Latina, UNESCO.
    </div>
  `;
  document.getElementById('result-section').style.display = 'block';

  // Mostrar gráfica
  setTimeout(() => {
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
