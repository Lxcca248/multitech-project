// Chart Visitas Diárias
const ctxDaily = document.getElementById('dailyVisitsChart');
if (ctxDaily) {
  new Chart(ctxDaily, {
    type: 'bar',
    data: {
      labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      datasets: [{
        label: 'Visitas Diárias',
        data: [120, 190, 170, 210, 180, 200, 230],
        backgroundColor: '#2563eb'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Chart Usuários Cadastrados por mês
const ctxUsers = document.getElementById('userRegistrationsChart');
if (ctxUsers) {
  new Chart(ctxUsers, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'Cadastros',
        data: [10, 20, 15, 25, 22, 30, 35],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Logout (mesma função que nas outras páginas)
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
  });
}

// Checa login
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) window.location.href = 'login.html';
});
