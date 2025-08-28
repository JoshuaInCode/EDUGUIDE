// vocational-dashboard-visual.js
// Renderiza resultados de test vocacional con gráficas tipo IMBT en el dashboard


function renderVocationalResults() {
  const container = document.getElementById('vocationalResults');
  if (!container) return;
  let history = [];
  try { history = JSON.parse(localStorage.getItem('vocationalResults') || '[]'); } catch {}
  container.innerHTML = '';
  if (!history.length) {
    container.innerHTML = `<div class='bar-item text-center text-muted' id='noResultsMsg'><span style='font-size:1.1rem;'>Aún no has completado ningún test vocacional.</span></div>`;
    return;
  }
  history.slice().reverse().forEach((res, idx) => {
    const chartId = `vocChart${idx}`;
    // Tabla de puntajes por área
    const tableRows = Object.keys(res.counts).map(type =>
      `<tr><td style='padding:4px 10px;'>${type.charAt(0).toUpperCase() + type.slice(1)}</td><td style='padding:4px 10px;'>${res.counts[type]}</td></tr>`
    ).join('');
    // Universidades
    const universidades = res.universidades && res.universidades.length
      ? res.universidades.map(u => `<li style='margin-bottom:4px;'><i class='fas fa-university me-2' style='color:#2196f3;'></i>${u}</li>`).join('')
      : '<li>No hay universidades recomendadas.</li>';
    // Layout 2 columnas IMBT/feng shui
    container.innerHTML += `
      <div class='vocational-result-block' style='background:#f8f9fa;border-radius:18px;padding:28px 32px 18px 32px;margin-bottom:28px;box-shadow:0 2px 16px 0 #e3eaf2;display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:stretch;'>
        <div style='display:flex;flex-direction:column;gap:16px;justify-content:flex-start;'>
          <div style='font-size:1.18rem;color:#1769aa;font-weight:700;line-height:1.2;'>${res.resultName}</div>
          <div style='color:#888;font-size:0.98rem;font-weight:500;'>${res.fecha}</div>
          <div style='margin-top:2px;'>
            <table class='table table-bordered table-sm' style='max-width:320px;margin:0 auto 0 0;background:white;'>
              <thead><tr><th>Área</th><th>Puntaje</th></tr></thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>
          <div style='margin:8px 0 0 0;'>
            <h6 style='color:#1769aa;font-size:1.01rem;font-weight:600;margin-bottom:4px;'>Universidades recomendadas</h6>
            <ul style='padding-left:0;list-style:none;margin-bottom:0;'>${universidades}</ul>
          </div>
        </div>
        <div style='display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:18px;'>
          <canvas id='${chartId}' height='180' width='180' style='max-width:220px;max-height:220px;'></canvas>
          <div style='color:#444;font-size:1.01rem;text-align:justify;margin-bottom:4px;'>${res.resultDesc}</div>
          <div class='mt-2' style='font-size:0.93rem;color:#888;text-align:left;'>
            <b>Fuentes:</b> Holland, J. L. (1997). Making Vocational Choices. Super, D. E. (1990). A life-span, life-space approach to career development. Brown, D. (2002). Career Choice and Development. Deci & Ryan (2000). Self-Determination Theory. Universidades de Panamá, UTP, U. Latina, UNESCO.
          </div>
        </div>
      </div>
    `;
    setTimeout(() => {
      const ctx = document.getElementById(chartId).getContext('2d');
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: Object.keys(res.counts).map(type => type.charAt(0).toUpperCase() + type.slice(1)),
          datasets: [{
            label: 'Perfil vocacional',
            data: Object.values(res.counts),
            backgroundColor: 'rgba(33,150,243,0.18)',
            borderColor: '#1769aa',
            pointBackgroundColor: '#2196f3',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { r: { angleLines: { display: false }, suggestedMin: 0, suggestedMax: Math.max(...Object.values(res.counts), 3) } }
        }
      });
    }, 100);
  });
}
document.addEventListener('DOMContentLoaded', renderVocationalResults);
