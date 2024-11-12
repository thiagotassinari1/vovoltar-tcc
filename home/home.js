// transforma em objeto para conseguir buscar/manipular os dados do local storage
usuarioLogado = JSON.parse(localStorage.getItem('user'));
console.log(usuarioLogado);

console.log(usuarioLogado.id, usuarioLogado.email, usuarioLogado.senha, usuarioLogado.origin);

// criar função para deslogar do site e voltar para o login
const logout = document.getElementById('botao-logout').addEventListener('click', function (){
    localStorage.removeItem('user');
    window.location.href = '../login/login.html'
});

const verEstagios = document.getElementById('ver_estagios').addEventListener('click', function() {
    window.location.href = '../estagios/estagios.html'
});