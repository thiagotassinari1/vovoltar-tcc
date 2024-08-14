// perfil.js

// Verificar se o usuário está logado
function verificarLogin() {
  const usuarioLogado = localStorage.getItem('usuario');
  console.log('Usuário recuperado do local storage:', usuarioLogado);

  if (usuarioLogado !== null && usuarioLogado !== '') {
    try {
      const usuario = JSON.parse(usuarioLogado);
      console.log(usuario);

      if (usuario && usuario.id && usuario.tipo_usuario) {
        document.getElementById('botao-logout').style.display = 'block';
      } else {
        console.error('Usuário não tem as propriedades esperadas');
        localStorage.removeItem('usuario');
        window.location.href = '../login/login.html';
      }
    } catch (error) {
      console.error('Erro ao parsear o usuário:', error);
      localStorage.removeItem('usuario');
      window.location.href = '../login/login.html';
    }
  } else {
    // Redirecionar para a página de login se o usuário não estiver logado
    window.location.href = '../login/login.html';
  }
}

// Logout do usuário
function logout() {
  localStorage.removeItem('usuario');
  window.location.href = '../login/login.html';
}

// Chamada inicial
verificarLogin();

// Evento de logout
document.getElementById('botao-logout').addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', async function(event) {
  event.preventDefault();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  const id = usuarioLogado.id;
  console.log(id);

  const response = await fetch(`http://localhost:3001/api/get/infosUser/${id}`, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });
  
  let content = await response.json();
  console.log(content);

  if (content.success) {
    const nome = content.data[0].nome;
    const email = content.data[0].email;
    const telefone = content.data[0].telefone;
    const nascimento = content.data[0].nascimento;

    let nomeAtual = document.getElementById('nome_usuario');
    let emailAtual = document.getElementById('email_usuario');
    let telefoneAtual = document.getElementById('telefone_usuario');
    let nascimentoAtual = document.getElementById('nascimento_usuario');

    nomeAtual.textContent = nome;
    emailAtual.textContent = email;
    telefoneAtual.textContent = telefone;
    nascimentoAtual.textContent = nascimento;
  } else {
    alert('Erro no login, tente novamente!');
  }
});