// transforma em objeto para conseguir buscar/manipular os dados do local storage
usuarioLogado = JSON.parse(localStorage.getItem('user'));
console.log(usuarioLogado);

console.log(usuarioLogado.id, usuarioLogado.email, usuarioLogado.senha, usuarioLogado.origin);

// puxar o email para aparecer no front
const emailUser = document.getElementById('email-usuario').innerHTML = usuarioLogado.email;

// criar função para deslogar do site e voltar para o login
const logout = document.getElementById('botao-logout').addEventListener('click', function (){
    localStorage.removeItem('user');
    window.location.href = '../login/login.html'
});