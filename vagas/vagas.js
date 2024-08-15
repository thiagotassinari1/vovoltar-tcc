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

// função dos posts de vaga
let formularioVaga = document.getElementById('formulario_vagas');
let botaoCriarVaga = document.getElementById('criar_vaga');
let botaoDeletarVaga = document.querySelector('.deletar_vaga');

const usuarioLogado = localStorage.getItem('usuario');
if (usuarioLogado) {
    const usuario = JSON.parse(usuarioLogado);
    if (usuario && usuario.tipo_usuario === 'pessoa') {
        botaoCriarVaga.style.display = 'none';
        // botaoDeletarVaga.style.display = 'none';

    } else if (usuario && usuario.tipo_usuario === 'empresa') {
        botaoCriarVaga.style.display = 'block';
    }
}

// Função para criar um card de vaga
function criarCardVaga(vaga) {
    let cardVaga = document.createElement('div');
    cardVaga.className = 'card_vaga';
    cardVaga.dataset.id = vaga.id; // Armazenar o ID único no card

    let colunasCard = document.createElement('div');
    colunasCard.className = 'colunasCard_vaga';

    let infosVaga = document.createElement('div');
    infosVaga.className = 'infos_vaga';

    // Adicionando conteúdo ao card
    infosVaga.innerHTML = `
        <h3>${vaga.area}</h3>
        <p><b>Email:</b> ${vaga.email_empresa}</p>
        <p><b>Cidade:</b> ${vaga.cidade}</p>
        <p><b>Estado:</b> ${vaga.estado}</p>
        <p><b>Quantidade de Vagas:</b> ${vaga.qtd_vagas}</p>
    `;

    // criando coluna para os botoes
    let botoesVaga = document.createElement('div');
    botoesVaga.className = 'botoes_vaga';

    // Criando botão pra config do card da vaga
    let botaoCardVaga = document.createElement('div');
    botaoCardVaga.className = 'info_vaga';
    botaoCardVaga.innerHTML = 'Mais informações';
    botoesVaga.appendChild(botaoCardVaga);

    // Verificar se o usuário logado é uma empresa
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        if (usuario && usuario.tipo_usuario === 'empresa') {
            // Criando botão pra deletar a vaga
            let botaoDeleteVaga = document.createElement('div');
            botaoDeleteVaga.className = 'deletar_vaga';
            botaoDeleteVaga.innerHTML = 'Deletar Vaga';
            botoesVaga.appendChild(botaoDeleteVaga);

            // Adicionando evento para deletar a vaga
            botaoDeleteVaga.addEventListener('click', async function () {
                const deleteResponse = await fetch(`http://localhost:3001/api/vaga/${vaga.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-type': 'application/json;charset=UTF-8' }
                });

                if (deleteResponse.ok) {
                    alert('Vaga deletada com sucesso!');
                    cardVaga.remove();
                } else {
                    alert('Erro ao deletar a vaga, tente novamente.');
                }
            });
        }
    }

    // adicionando as colunas ao card
    colunasCard.appendChild(infosVaga);
    colunasCard.appendChild(botoesVaga);
    cardVaga.appendChild(colunasCard);

    // adicionando o card na section de vagas
    document.querySelector('.vagas').appendChild(cardVaga);
}

// Função para carregar vagas do servidor
// Fazer isso com base no video do sor vitor de puxar coisas do banco de dados
async function carregarVagas() {
    const response = await fetch('http://localhost:3001/api/vagas');
    const content = await response.json();

    if (content.success) {
        content.vagas.forEach(vaga => {
            criarCardVaga(vaga);
        });
    } else {
        alert('Erro ao carregar vagas, tente novamente.');
    }
}

// abrir formulário
let criarVaga = document.getElementById('criar_vaga').addEventListener('click', function (event) {
    formularioVaga.style.display = 'flex';
});

// fechar formulário
let cancelarVaga = document.getElementById('cancelar_vaga').addEventListener('click', function (event) {
    formularioVaga.style.display = 'none';
    formularioVaga.reset();
});

// publicar vaga
let publicarVaga = document.getElementById('publicar_vaga');

publicarVaga.onclick = async function () {
    let area = document.getElementById('area_atuacao').value;
    let email_empresa = document.getElementById('email').value;
    let cidade = document.getElementById('cidade').value;
    let estado = document.getElementById('estado').value;
    let qtd_vagas = document.getElementById('qtd_vagas').value;

    if (!area || !email_empresa || !cidade || !estado || !qtd_vagas) {
        alert('Preencha todos os campos para publicar sua vaga!');
    } else {
        let data = { area, email_empresa, cidade, estado, qtd_vagas };

        const response = await fetch('http://localhost:3001/api/store/vaga', {
            method: 'POST',
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data)
        });

        let content = await response.json();

        if (content.success) {
            alert('Sucesso!');
            criarCardVaga({
                id: content.vagaId,
                area: area,
                email_empresa: email_empresa,
                cidade: cidade,
                estado: estado,
                qtd_vagas: qtd_vagas
            });

            // Ocultando o formulário e resetando os campos
            formularioVaga.style.display = 'none';
            formularioVaga.reset();
        } else {
            alert('Algo deu errado, tente novamente!');
        }
    }
};

// Carregar vagas ao carregar a página
window.onload = carregarVagas;