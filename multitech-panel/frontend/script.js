// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simulação login válido
    if (email === 'admin@admin.com' && password === '123456') {
      localStorage.setItem('user', JSON.stringify({ email, name: 'Usuário Demo' }));
      window.location.href = 'dashboard.html';
    } else {
      alert('Usuário ou senha inválidos!');
    }
  });
}

// Registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  });
}

// Função para carregar usuários reais do backend
async function carregarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) throw new Error('Erro ao carregar usuários');

    const usuarios = await response.json();
    const totalUsersEl = document.getElementById('totalUsers');
    if (totalUsersEl) {
      totalUsersEl.textContent = usuarios.length;
    }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

// Quando o DOM estiver pronto
window.addEventListener('DOMContentLoaded', () => {
  const userNameSpan = document.getElementById('userName');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    window.location.href = 'login.html';
  } else if (userNameSpan) {
    userNameSpan.textContent = user.name || 'Usuário';
  }

  // Carregar usuários da API para atualizar o card
  carregarUsuarios();
});

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
  });
}

// Chart.js gráfico
const ctx = document.getElementById('myChart');
if (ctx) {
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
      datasets: [{
        label: 'Visitas Mensais',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        borderColor: '#2563eb',
        data: [50, 70, 40, 90, 120, 150, 170],
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#1f2937',
            font: {
              size: 14,
              weight: '600'
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#6b7280'
          },
          grid: {
            color: '#e5e7eb'
          }
        },
        x: {
          ticks: {
            color: '#6b7280'
          },
          grid: {
            color: '#f3f4f6'
          }
        }
      }
    }
  });
}
