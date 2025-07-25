// Logout
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
  });
}

// Preencher formulário com dados simulados
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(!user) return window.location.href = 'login.html';

  // Simula preenchimento
  document.getElementById('displayName').value = user.name || '';
  document.getElementById('emailNotifications').checked = true; // default ligado
});

// Salvar configurações (simulado)
const form = document.getElementById('settingsForm');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const displayName = document.getElementById('displayName').value.trim();
    const emailNotifications = document.getElementById('emailNotifications').checked;

    // Aqui você pode salvar no backend (aqui só localStorage simulando)
    const user = JSON.parse(localStorage.getItem('user')) || {};
    user.name = displayName;
    localStorage.setItem('user', JSON.stringify(user));

    alert('Configurações salvas com sucesso!');
  });
}
