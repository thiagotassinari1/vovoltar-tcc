// home.js

// Verificar se o usuário está logado
function verificarLogin() {
  const usuarioLogado = localStorage.getItem('usuario');
  console.log('Usuário recuperado do local storage:', usuarioLogado);

  if (usuarioLogado !== null && usuarioLogado !== '') {
    try {
      const usuario = JSON.parse(usuarioLogado);
      console.log(usuario);

      if (usuario && usuario.email && usuario.tipo_usuario) {
        // Mostrar informações do usuário logado
        document.getElementById('email-usuario').innerHTML = usuario.email;
        document.getElementById('tipo-usuario').innerHTML = usuario.tipo_usuario;

        // Desabilitar botão de login e habilitar botão de logout
        document.getElementById('botao-login').style.display = 'none';
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