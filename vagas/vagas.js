// definir variáveis uteis para as funções
const formularioVaga = document.getElementById('formulario_vagas');

// definir campos do formulario
const areaAtuacao = document.getElementById('area_atuacao');
const emailContato = document.getElementById('email');
const cidadeForm = document.getElementById('cidade');
const estadoForm = document.getElementById('estado');
const qtd_vagasForm = document.getElementById('qtd_vagas');
const descricao = document.getElementById('descricao');

const botaoCriarVaga = document.getElementById('criar_vaga');
const botaoDeletarVaga = document.querySelector('.deletar_vaga');

// recuperar usuario do local storage
const usuarioLogado = JSON.parse(localStorage.getItem('user'));
console.log(usuarioLogado);

// conferir de é empresa ou pessoa para permitir criar vagas ou nao
if (usuarioLogado.origin === 'usuariopf') {
    botaoCriarVaga.style.display = 'none';

} else if (usuarioLogado.origin === 'empresa') {
    botaoCriarVaga.style.display = 'flex';
}

// puxar campos para mostrar infos do usuário no front
const emailUser = document.getElementById('email-usuario').innerHTML = usuarioLogado.email;

// definir o email da empresa que ta logada quando abre o formulário
emailContato.value = emailUser;

// criar função para deslogar do site e voltar para o login
const logout = document.getElementById('botao-logout').addEventListener('click', function () {
    localStorage.removeItem('user');
    window.location.href = '../login/login.html'
});

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

    // Criando botão para mostrar mais informações
    let botaoCardVaga = document.createElement('div');
    botaoCardVaga.className = 'info_vaga';
    botaoCardVaga.innerHTML = 'Mais informações';
    botoesVaga.appendChild(botaoCardVaga);

    // Evento de clique para mostrar ou ocultar descrição da vaga
    botaoCardVaga.addEventListener('click', function () {

        let maisInfoVaga = document.getElementById("mais_info_vaga");
        let txt_detalhe_vaga = document.getElementById('detalhes_vaga');
        let fecharDetalhes = document.getElementById('fechar_detalhes');

        fecharDetalhes.addEventListener('click', function () {
            maisInfoVaga.style.display = 'none';
        });

        maisInfoVaga.style.display = 'flex';
        txt_detalhe_vaga.innerHTML = vaga.descricao;

    });

    // Verificar se o usuário logado é uma empresa
    const empresaLogada = JSON.parse(localStorage.getItem('user'));
    if (vaga.empresa_id === empresaLogada.id) {
        // Criando botão pra deletar a vaga
        let botaoDeleteVaga = document.createElement('div');
        botaoDeleteVaga.className = 'deletar_vaga';
        botaoDeleteVaga.innerHTML = 'Deletar Vaga';
        botoesVaga.appendChild(botaoDeleteVaga);

        // Adicionando evento para deletar a vaga
        botaoDeleteVaga.addEventListener('click', async function () {
            const deleteResponse = await fetch(`http://localhost:3001/api/vaga/${vaga.id}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json;charset=UTF-8' },
                body: JSON.stringify({ empresa_id: empresaLogada.id }) // Envia o id da empresa logada
            });
        
            if (deleteResponse.ok) {
                alert('Vaga deletada com sucesso!');
                cardVaga.remove();
            } else {
                const errorResponse = await deleteResponse.json();
                alert(errorResponse.message);
            }
        });        
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
    areaAtuacao.value = '';
    cidadeForm.value = '';
    estadoForm.value = '';
    qtd_vagasForm.value = '';
});

// publicar vaga
let publicarVaga = document.getElementById('publicar_vaga');

publicarVaga.onclick = async function () {
    let area = document.getElementById('area_atuacao').value;
    let email_empresa = document.getElementById('email').value;
    let cidade = document.getElementById('cidade').value;
    let estado = document.getElementById('estado').value;
    let qtd_vagas = document.getElementById('qtd_vagas').value;
    let descricao = document.getElementById('descricao').value;

    // Recupera o ID da empresa logada
    const empresaLogada = JSON.parse(localStorage.getItem('user'));
    let empresa_id = empresaLogada.id;

    if (!area || !email_empresa || !cidade || !estado || !qtd_vagas || !descricao || !empresa_id) {
        alert('Preencha todos os campos para publicar sua vaga!');
    } else {
        let data = { area, email_empresa, cidade, estado, qtd_vagas, descricao, empresa_id };

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
                qtd_vagas: qtd_vagas,
                empresa_id: empresa_id

            });

            // Ocultando o formulário e resetando os campos
            formularioVaga.style.display = 'none';
            areaAtuacao.value = '';
            cidadeForm.value = '';
            estadoForm.value = '';
            qtd_vagasForm.value = '';

            window.location.reload()
        } else {
            alert('Algo deu errado, tente novamente!');
        }
    }
};

// Carregar vagas ao carregar a página
window.onload = carregarVagas;