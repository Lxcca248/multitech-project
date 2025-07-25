// Logout
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
  });
}

// Função para carregar usuários do backend e preencher tabela
async function carregarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) throw new Error('Erro ao carregar usuários');
    const usuarios = await response.json();

    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';

    usuarios.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name || 'Sem nome'}</td>
        <td>${user.email || 'Sem email'}</td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

// Verifica login e carrega usuários
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) window.location.href = 'login.html';

  carregarUsuarios();
});
