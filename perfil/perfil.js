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
      const sobre = content.data[0].sobre;
      const ft_perfil = content.data[0].ft_perfil;

      let nomeAtual = document.getElementById('nome_usuario');
      let emailAtual = document.getElementById('email_usuario');
      let telefoneAtual = document.getElementById('telefone_usuario');
      let nascimentoAtual = document.getElementById('nascimento_usuario');
      let areaAtuacaoAtual = document.getElementById('area_atuacao');
      let sobreAtual = document.getElementById('texto_sobre_usuario');
      let ftPerfilAtual = document.getElementById('foto-usuario');

      nomeAtual.textContent = nome;
      emailAtual.textContent = email;
      telefoneAtual.textContent = telefone;
      nascimentoAtual.textContent = nascimento;
      areaAtuacaoAtual.textContent = areaAtuacao;
      sobreAtual.textContent = sobre;
      ftPerfilAtual.src = `../back_api/src/uploads/fotos/${ft_perfil}`;
      console.log(curriculo)
    } else {
      alert('Erro para puxar os dados!');
    }
  } else {

    const ocultarAnexos = document.getElementById('anexos_direita').style.display = 'none';


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
      const fotoEmpresa = content.data[0].ft_perfil

      const mudarTelparaCnpj = document.getElementById('mudar_titulo_info_tel').innerHTML = 'CNPJ'
      const mudarNascparaEndereco = document.getElementById('mudar_titulo_info_nasc').innerHTML = 'Endereço'
      const ocultarAreaAtuacao = document.getElementById('ocultar_area_atuacao').style = 'display: none;'

      let nomeAtual = document.getElementById('nome_usuario');
      let emailAtual = document.getElementById('email_usuario');
      let cnpjAtual = document.getElementById('telefone_usuario');
      let enderecoAtual = document.getElementById('nascimento_usuario');
      let fotoEmpresaAtual = document.getElementById('foto-usuario');

      nomeAtual.textContent = nome;
      emailAtual.textContent = email;
      cnpjAtual.textContent = cnpj;
      enderecoAtual.textContent = endereco;
      fotoEmpresaAtual.src = `../back_api/src/uploads/fotos/${fotoEmpresa}`;
    }
  }
});

// Botões para edição e cancelamento
let editarPerfilBtn = document.getElementById('editar_perfil');
let salvarPerfilBtn = document.getElementById('salvar_perfil');
let enviarFotoBtn = document.getElementById('enviar_foto');
let removerFotoBtn = document.getElementById('remover_ft');
let formFotoPerfil = document.getElementById('form_foto');

if (usuarioLogado.origin === 'usuariospf') {
  // Função para remover a foto de perfil
  removerFotoBtn.onclick = async function () {
    const usuarioLogado = JSON.parse(localStorage.getItem('user'));
    const id = usuarioLogado.id;

    const response = await fetch('http://localhost:3001/api/remove/fotoPerfil', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });

    let content = await response.json();

    if (content.success) {
      alert('Foto de perfil removida com sucesso!');
      document.getElementById('foto-usuario').src = '../assets/user.png'; // Exibe uma imagem padrão
    } else {
      alert('Erro ao remover a foto de perfil!');
      console.log(content.sql);
    }
  };
} else if (usuarioLogado.origin === 'empresa') {
  // Função para remover a foto de perfil
  removerFotoBtn.onclick = async function () {
    const usuarioLogado = JSON.parse(localStorage.getItem('user'));
    const id = usuarioLogado.id;

    const response = await fetch('http://localhost:3001/api/remove/fotoPerfilEmpresa', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });

    let content = await response.json();

    if (content.success) {
      alert('Foto de perfil removida com sucesso!');
      document.getElementById('foto-usuario').src = '../assets/user.png'; // Exibe uma imagem padrão
    } else {
      alert('Erro ao remover a foto de perfil!');
      console.log(content.sql);
    }
  };
}



// Cria o botão "Cancelar" e insere após o botão "Salvar"
let cancelarPerfilBtn = document.createElement('button');
cancelarPerfilBtn.id = 'cancelar_perfil';
cancelarPerfilBtn.innerText = 'Cancelar';
cancelarPerfilBtn.style.display = 'none';
salvarPerfilBtn.insertAdjacentElement('afterend', cancelarPerfilBtn);

// Função para entrar no modo de edição do perfil
editarPerfilBtn.onclick = function () {
  // Preenche os campos de edição com os dados atuais do perfil
  document.getElementById('input_nome_usuario').value = document.getElementById('nome_usuario').textContent;
  document.getElementById('input_email_usuario').value = document.getElementById('email_usuario').textContent;
  document.getElementById('input_telefone_usuario').value = document.getElementById('telefone_usuario').textContent;
  document.getElementById('input_nascimento_usuario').value = document.getElementById('nascimento_usuario').textContent;
  document.getElementById('input_area_atuacao').value = document.getElementById('area_atuacao').textContent;
  document.getElementById('input_texto_sobre_usuario').value = document.getElementById('texto_sobre_usuario').textContent;

  // Exibe campos de edição e os botões "Salvar", "Cancelar", e o campo de upload de foto
  document.getElementById('input_nome_usuario').style.display = 'block';
  document.getElementById('input_email_usuario').style.display = 'block';
  document.getElementById('input_telefone_usuario').style.display = 'block';
  document.getElementById('input_nascimento_usuario').style.display = 'block';
  document.getElementById('input_area_atuacao').style.display = 'block';
  document.getElementById('input_texto_sobre_usuario').style.display = 'block';

  // Esconde os textos originais
  document.getElementById('nome_usuario').style.display = 'none';
  document.getElementById('email_usuario').style.display = 'none';
  document.getElementById('telefone_usuario').style.display = 'none';
  document.getElementById('nascimento_usuario').style.display = 'none';
  document.getElementById('area_atuacao').style.display = 'none';
  document.getElementById('texto_sobre_usuario').style.display = 'none';

  // Exibe o campo de upload de foto e botões de edição
  formFotoPerfil.style.display = 'flex';

  // Alterna a visibilidade dos botões
  editarPerfilBtn.style.display = 'none';
  salvarPerfilBtn.style.display = 'block';
  cancelarPerfilBtn.style.display = 'block';
};

// Função para salvar as alterações do perfil
salvarPerfilBtn.onclick = async function () {
  // Aqui irá o código para salvar as alterações
  // Após salvar, restaura a visibilidade original

  cancelarPerfilBtn.style.display = 'none';
  editarPerfilBtn.style.display = 'block';
  salvarPerfilBtn.style.display = 'none';
  formFotoPerfil.style.display = 'none';
};

// Função para cancelar a edição do perfil e restaurar a visibilidade original
cancelarPerfilBtn.onclick = function () {
  // Oculta os campos de edição e exibe os textos originais
  document.getElementById('input_nome_usuario').style.display = 'none';
  document.getElementById('input_email_usuario').style.display = 'none';
  document.getElementById('input_telefone_usuario').style.display = 'none';
  document.getElementById('input_nascimento_usuario').style.display = 'none';
  document.getElementById('input_area_atuacao').style.display = 'none';
  document.getElementById('input_texto_sobre_usuario').style.display = 'none';

  // Restaura a visibilidade dos textos
  document.getElementById('nome_usuario').style.display = 'block';
  document.getElementById('email_usuario').style.display = 'block';
  document.getElementById('telefone_usuario').style.display = 'block';
  document.getElementById('nascimento_usuario').style.display = 'block';
  document.getElementById('area_atuacao').style.display = 'block';
  document.getElementById('texto_sobre_usuario').style.display = 'block';

  // Oculta os botões de edição
  salvarPerfilBtn.style.display = 'none';
  editarPerfilBtn.style.display = 'block';
  cancelarPerfilBtn.style.display = 'none';
  formFotoPerfil.style.display = 'none'; cd
};


// Função para salvar as alterações do perfil (pessoa ou empresa)
salvarPerfilBtn.onclick = async function () {
  const usuarioLogado = JSON.parse(localStorage.getItem('user'));
  const id = usuarioLogado.id;

  if (usuarioLogado.origin === 'usuariopf') {
    // Atualizando perfil de PESSOA FÍSICA
    const nome = document.getElementById('input_nome_usuario').value;
    const email = document.getElementById('input_email_usuario').value;
    const telefone = document.getElementById('input_telefone_usuario').value;
    const nascimento = document.getElementById('input_nascimento_usuario').value;
    const areaAtuacao = document.getElementById('input_area_atuacao').value;
    const sobre = document.getElementById('input_texto_sobre_usuario').value;

    const userData = {
      id: id,
      nome: nome,
      email: email,
      telefone: telefone,
      nascimento: nascimento,
      area_atuacao: areaAtuacao,
      sobre: sobre,
    };

    // Requisição PUT para atualizar o perfil de pessoa
    const response = await fetch('http://localhost:3001/api/update/infosUser', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    let content = await response.json();
    if (content.success) {
      alert('Perfil atualizado com sucesso!');
      // Atualizar a interface com os novos dados da pessoa
      document.getElementById('nome_usuario').textContent = nome;
      document.getElementById('email_usuario').textContent = email;
      document.getElementById('telefone_usuario').textContent = telefone;
      document.getElementById('nascimento_usuario').textContent = nascimento;
      document.getElementById('area_atuacao').textContent = areaAtuacao;
      document.getElementById('texto_sobre_usuario').textContent = sobre;

      // Atualizar o Local Storage
      usuarioLogado.nome = nome;
      usuarioLogado.email = email;
      usuarioLogado.telefone = telefone;
      usuarioLogado.nascimento = nascimento;
      usuarioLogado.area_atuacao = areaAtuacao;
      usuarioLogado.sobre = sobre;
      localStorage.setItem('user', JSON.stringify(usuarioLogado));

      // Esconder o campo de input "Sobre" e mostrar o texto
      document.getElementById('input_texto_sobre_usuario').style.display = 'none';
      document.getElementById('form_foto').style.display = 'none';
      document.getElementById('texto_sobre_usuario').style.display = 'block';
      cancelarPerfilBtn.style.display = 'none';

      // Voltar ao modo de exibição (esconder inputs)
      toggleDisplayInputs(false);

      window.location.reload();
    } else {
      alert('Erro ao atualizar o perfil!');
      console.log(content.sql);
    }
  } else if (usuarioLogado.origin === 'empresa') {
    // Atualizando perfil de EMPRESA
    const nome = document.getElementById('input_nome_usuario').value;
    const email = document.getElementById('input_email_usuario').value;
    const cnpj = document.getElementById('input_telefone_usuario').value; // CNPJ
    const endereco = document.getElementById('input_nascimento_usuario').value; // Endereço
    const sobre = document.getElementById('input_texto_sobre_usuario').value;

    const empresaData = {
      id: id,
      nome: nome,
      email: email,
      cnpj: cnpj,
      endereco: endereco,
      sobre: sobre
    };

    // Requisição PUT para atualizar o perfil da empresa
    const response = await fetch('http://localhost:3001/api/update/infosEmpresa', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empresaData),
    });

    let content = await response.json();
    if (content.success) {
      alert('Perfil da empresa atualizado com sucesso!');
      // Atualizar a interface com os novos dados da empresa
      document.getElementById('nome_usuario').textContent = nome;
      document.getElementById('email_usuario').textContent = email;
      document.getElementById('telefone_usuario').textContent = cnpj;
      document.getElementById('nascimento_usuario').textContent = endereco;
      document.getElementById('texto_sobre_usuario').textContent = sobre;

      // Atualizar o Local Storage
      usuarioLogado.email = email;
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));

      // Esconder o campo de input "Sobre" e mostrar o texto
      document.getElementById('input_texto_sobre_usuario').style.display = 'none';
      document.getElementById('texto_sobre_usuario').style.display = 'block';
      cancelarPerfilBtn.style.display = 'none';

      // Voltar ao modo de exibição (esconder inputs)
      toggleDisplayInputs(false);

      window.location.reload()
    } else {
      alert('Erro ao atualizar o perfil da empresa!');
      console.log(content.sql);
    }
  }
};

// Função auxiliar para alternar a exibição dos inputs e textos
function toggleDisplayInputs(editMode) {
  const inputs = document.querySelectorAll('.input_editar');
  const texts = document.querySelectorAll('.info_campo p');

  inputs.forEach(input => input.style.display = editMode ? 'block' : 'none');
  texts.forEach(text => text.style.display = editMode ? 'none' : 'block');

  document.getElementById('salvar_perfil').style.display = editMode ? 'block' : 'none';
  document.getElementById('editar_perfil').style.display = editMode ? 'none' : 'block';
}

if (usuarioLogado.origin === 'usuariopf') {
  let enviarFoto = document.getElementById('enviar_foto');

  enviarFoto.onclick = async function (event) {
    event.preventDefault();

    const usuarioLogado = JSON.parse(localStorage.getItem('user'));
    const id = usuarioLogado.id;

    let form = document.getElementById('form_foto');
    let formData = new FormData(form);
    formData.append('id', id);

    const response = await fetch('http://localhost:3001/api/update/fotoPerfil', {
      method: 'PUT',
      body: formData
    });

    let content = await response.json();

    if (content.success) {
      alert('Foto de perfil enviada com sucesso!');
      // Atualizar a foto no frontend
      document.getElementById('foto-usuario').src = `../back_api/src/uploads/fotos/${content.ft_perfil}`;
      window.location.reload()
    } else {
      alert('Erro ao enviar a foto!');
      console.log(content.sql);
    }
  };
} else if (usuarioLogado.origin === 'empresa') {
  let enviarFoto = document.getElementById('enviar_foto');

  enviarFoto.onclick = async function (event) {
    event.preventDefault();

    const usuarioLogado = JSON.parse(localStorage.getItem('user'));
    const id = usuarioLogado.id;

    let form = document.getElementById('form_foto');
    let formData = new FormData(form);
    formData.append('id', id);

    const response = await fetch('http://localhost:3001/api/update/logoEmpresa', {
      method: 'PUT',
      body: formData
    });

    let content = await response.json();

    if (content.success) {
      alert('Foto de perfil enviada com sucesso!');
      // Atualizar a foto no frontend
      document.getElementById('foto-usuario').src = `../back_api/src/uploads/fotos/${content.ft_perfil}`;
      window.location.reload()
    } else {
      alert('Erro ao enviar a foto!');
      console.log(content.sql);
    }
  };
}