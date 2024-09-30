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

let editarPerfilBtn = document.getElementById('editar_perfil');
let salvarPerfilBtn = document.getElementById('salvar_perfil');

// Função para permitir edição dos campos
editarPerfilBtn.onclick = function () {
    // Tornar os campos editáveis
    document.getElementById('nome_usuario').style.display = 'none';
    document.getElementById('input_nome_usuario').style.display = 'block';
    document.getElementById('input_nome_usuario').value = document.getElementById('nome_usuario').textContent;

    document.getElementById('email_usuario').style.display = 'none';
    document.getElementById('input_email_usuario').style.display = 'block';
    document.getElementById('input_email_usuario').value = document.getElementById('email_usuario').textContent;

    document.getElementById('telefone_usuario').style.display = 'none';
    document.getElementById('input_telefone_usuario').style.display = 'block';
    document.getElementById('input_telefone_usuario').value = document.getElementById('telefone_usuario').textContent;

    document.getElementById('nascimento_usuario').style.display = 'none';
    document.getElementById('input_nascimento_usuario').style.display = 'block';
    document.getElementById('input_nascimento_usuario').value = document.getElementById('nascimento_usuario').textContent;

    document.getElementById('area_atuacao').style.display = 'none';
    document.getElementById('input_area_atuacao').style.display = 'block';
    document.getElementById('input_area_atuacao').value = document.getElementById('area_atuacao').textContent;

    // Tornar a seção "Sobre" editável
    document.getElementById('texto_sobre_usuario').style.display = 'none';
    document.getElementById('input_texto_sobre_usuario').style.display = 'block';
    document.getElementById('input_texto_sobre_usuario').value = document.getElementById('texto_sobre_usuario').textContent;

    // Alternar botões
    editarPerfilBtn.style.display = 'none';
    salvarPerfilBtn.style.display = 'block';
};

// Função para salvar as alterações
salvarPerfilBtn.onclick = async function () {
    const usuarioLogado = JSON.parse(localStorage.getItem('user'));
    const id = usuarioLogado.id;

    // Pegando os novos valores dos inputs
    const nome = document.getElementById('input_nome_usuario').value;
    const email = document.getElementById('input_email_usuario').value;
    const telefone = document.getElementById('input_telefone_usuario').value;
    const nascimento = document.getElementById('input_nascimento_usuario').value;
    const areaAtuacao = document.getElementById('input_area_atuacao').value;
    const textoSobre = document.getElementById('input_texto_sobre_usuario').value; // Novo campo

    const userData = {
        id: id,
        nome: nome,
        email: email,
        telefone: telefone,
        nascimento: nascimento,
        area_atuacao: areaAtuacao,
        sobre: textoSobre, // Novo campo "Sobre"
    };

    const response = await fetch('http://localhost:3001/api/update/infosUser', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    let content = await response.json();

    if (content.success) {
        alert('Perfil atualizado com sucesso!');

        // Atualizar os dados na tela
        document.getElementById('nome_usuario').textContent = nome;
        document.getElementById('email_usuario').textContent = email;
        document.getElementById('telefone_usuario').textContent = telefone;
        document.getElementById('nascimento_usuario').textContent = nascimento;
        document.getElementById('area_atuacao').textContent = areaAtuacao;
        document.getElementById('texto_sobre_usuario').textContent = textoSobre; // Atualizar o texto sobre

        // Voltar ao modo de exibição
        document.getElementById('nome_usuario').style.display = 'block';
        document.getElementById('input_nome_usuario').style.display = 'none';

        document.getElementById('email_usuario').style.display = 'block';
        document.getElementById('input_email_usuario').style.display = 'none';

        document.getElementById('telefone_usuario').style.display = 'block';
        document.getElementById('input_telefone_usuario').style.display = 'none';

        document.getElementById('nascimento_usuario').style.display = 'block';
        document.getElementById('input_nascimento_usuario').style.display = 'none';

        document.getElementById('area_atuacao').style.display = 'block';
        document.getElementById('input_area_atuacao').style.display = 'none';

        // Atualizar a exibição do "Sobre"
        document.getElementById('texto_sobre_usuario').style.display = 'block';
        document.getElementById('input_texto_sobre_usuario').style.display = 'none';

        editarPerfilBtn.style.display = 'block';
        salvarPerfilBtn.style.display = 'none';
    } else {
        alert('Erro ao atualizar perfil!');
        console.log(content.sql);
    }
};

