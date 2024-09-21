let enviarCurriculo = document.getElementById('enviar_curriculo');

enviarCurriculo.onclick = async function (event) {
  event.preventDefault();

  const usuarioLogado = JSON.parse(localStorage.getItem('user'));
  const id = usuarioLogado.id;

  let form = document.getElementById('form_curriculo');
  let formData = new FormData(form);
  formData.append('id', id);

  const response = await fetch('http://localhost:3001/api/update/curriculo', {
    method: 'PUT',
    body: formData
  });

  let content = await response.json();

  if (content.success) {
    alert('Currículo enviado com sucesso!');
  } else {
    alert('Erro ao enviar currículo!');
    console.log(content.sql)
  }
}

// transforma em objeto para conseguir buscar/manipular os dados do local storage
usuarioLogado = JSON.parse(localStorage.getItem('user'));
console.log(usuarioLogado);

console.log(usuarioLogado.id, usuarioLogado.email, usuarioLogado.senha, usuarioLogado.origin);

// puxar o email para aparecer no front
const emailUser = document.getElementById('email-usuario').innerHTML = usuarioLogado.email;

// criar função para deslogar do site e voltar para o login
const logout = document.getElementById('botao-logout').addEventListener('click', function () {
  localStorage.removeItem('user');
  window.location.href = '../login/login.html'
});


document.addEventListener('DOMContentLoaded', async function (event) {
  event.preventDefault();

  const usuarioLogado = JSON.parse(localStorage.getItem('user'));
  const id = usuarioLogado.id;
  console.log(id);
  console.log(usuarioLogado.origin);

  if (usuarioLogado.origin === 'usuariopf') {
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
      const areaAtuacao = content.data[0].area_atuacao;
      const curriculo = content.data[0].curriculo;

      let nomeAtual = document.getElementById('nome_usuario');
      let emailAtual = document.getElementById('email_usuario');
      let telefoneAtual = document.getElementById('telefone_usuario');
      let nascimentoAtual = document.getElementById('nascimento_usuario');
      let areaAtuacaoAtual = document.getElementById('area_atuacao');

      nomeAtual.textContent = nome;
      emailAtual.textContent = email;
      telefoneAtual.textContent = telefone;
      nascimentoAtual.textContent = nascimento;
      areaAtuacaoAtual.textContent = areaAtuacao;
    } else {
      alert('Erro para puxar os dados!');
    }
  } else {
    const response = await fetch(`http://localhost:3001/api/get/infosUserEmpresa/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });

    let content = await response.json();
    console.log(content);

    if (content.success) {
      const nome = content.data[0].nome;
      const email = content.data[0].email;
      const cnpj = content.data[0].cnpj;
      const endereco = content.data[0].endereco;

      const mudarTelparaCnpj = document.getElementById('mudar_titulo_info_tel').innerHTML = 'CNPJ'
      const mudarNascparaEndereco = document.getElementById('mudar_titulo_info_nasc').innerHTML = 'Endereço'
      const ocultarAreaAtuacao = document.getElementById('ocultar_area_atuacao').style = 'display: none;'

      let nomeAtual = document.getElementById('nome_usuario');
      let emailAtual = document.getElementById('email_usuario');
      let cnpjAtual = document.getElementById('telefone_usuario');
      let enderecoAtual = document.getElementById('nascimento_usuario');

      nomeAtual.textContent = nome;
      emailAtual.textContent = email;
      cnpjAtual.textContent = cnpj;
      enderecoAtual.textContent = endereco;
    }
  }
});