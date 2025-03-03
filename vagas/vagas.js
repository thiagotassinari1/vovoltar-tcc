// Definir variáveis úteis para as funções
const formularioVaga = document.getElementById('formulario_vagas');

// Definir campos do formulário
const areaAtuacao = document.getElementById('area_atuacao');
const emailContato = document.getElementById('email');
const cidadeForm = document.getElementById('cidade');
const estadoForm = document.getElementById('estado');
const qtd_vagasForm = document.getElementById('qtd_vagas');
const descricao = document.getElementById('descricao');

const botaoCriarVaga = document.getElementById('criar_vaga');
const botaoDeletarVaga = document.querySelector('.deletar_vaga');

// Recuperar usuário do local storage
const usuarioLogado = JSON.parse(localStorage.getItem('user'));
console.log(usuarioLogado);

// Conferir se é empresa ou pessoa para permitir criar vagas ou não
if (usuarioLogado.origin === 'usuariopf') {
    botaoCriarVaga.style.display = 'none';
} else if (usuarioLogado.origin === 'empresa') {
    botaoCriarVaga.style.display = 'flex';
}

// Função para deslogar do site e voltar para o login
const logout = document.getElementById('botao-logout').addEventListener('click', function () {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você será deslogado e redirecionado para a página de login.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deslogar',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'swal-confirm',
            cancelButton: 'swal-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('user');
            Swal.fire({
                title: 'Deslogado!',
                text: 'Você foi deslogado com sucesso.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                customClass: {
                    confirmButton: 'swal-confirm'
                }
            }).then(() => {
                window.location.href = '../login/login.html';
            });
        }
    });
});

// Função para criar um card de vaga
function criarCardVaga(vaga) {
    let cardVaga = document.createElement('div');
    cardVaga.className = 'card_vaga';
    cardVaga.dataset.id = vaga.id;

    let colunasCard = document.createElement('div');
    colunasCard.className = 'colunasCard_vaga';

    let infosVaga = document.createElement('div');
    infosVaga.className = 'infos_vaga';

    infosVaga.innerHTML = `
        <h3>${vaga.area}</h3>
        <p><b>Email:</b> ${vaga.email_empresa}</p>
        <p><b>Cidade:</b> ${vaga.cidade}</p>
        <p><b>Estado:</b> ${vaga.estado}</p>
        <p><b>Quantidade de Vagas:</b> ${vaga.qtd_vagas}</p>
    `;

    let botoesVaga = document.createElement('div');
    botoesVaga.className = 'botoes_vaga';

    // Botão para mais informações
    let botaoMaisInfo = document.createElement('div');
    botaoMaisInfo.className = 'info_vaga';
    botaoMaisInfo.innerHTML = 'Mais informações';
    botoesVaga.appendChild(botaoMaisInfo);

    // Evento para mostrar mais informações
    botaoMaisInfo.addEventListener('click', function () {
        let maisInfoVaga = document.getElementById("mais_info_vaga");
        let txt_detalhe_vaga = document.getElementById('detalhes_vaga');
        let fecharDetalhes = document.getElementById('fechar_detalhes');
        let botaoCandidatar = document.getElementById('botao_candidatar');

        fecharDetalhes.addEventListener('click', function () {
            maisInfoVaga.style.display = 'none';
        });

        maisInfoVaga.style.display = 'flex';
        txt_detalhe_vaga.innerHTML = vaga.descricao;

        const usuarioLogado = JSON.parse(localStorage.getItem('user'));
        if (usuarioLogado.origin === 'usuariopf') {
            botaoCandidatar.style.display = 'block'; // Torna o botão visível
        } else {
            botaoCandidatar.style.display = 'none'; // Oculta o botão
        }

        // Evento para enviar o e-mail de candidatura ao clicar em "Candidatar-se"
        botaoCandidatar.addEventListener('click', async function () {
            const usuarioLogado = JSON.parse(localStorage.getItem('user'));
            const candidaturaData = {
                emailEnvio: vaga.email_empresa,
                emailCandidato: usuarioLogado.email,
                userName: usuarioLogado.nome,
                foneUser: usuarioLogado.contato,
                nomeVaga: vaga.area,
                nomeEmpresa: vaga.nomeEmpresa
            };

            // Exibe o alerta de carregamento
            Swal.fire({
                title: 'Enviando candidatura...',
                text: 'Aguarde enquanto processamos sua solicitação.',
                icon: 'info',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await fetch('http://localhost:3001/api/email/candidatarVaga', {
                method: 'POST',
                headers: { 'Content-type': 'application/json;charset=UTF-8' },
                body: JSON.stringify(candidaturaData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                Swal.fire({
                    title: 'Candidatura enviada!',
                    text: `Você se candidatou com sucesso à vaga de ${vaga.area}.`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    customClass: {
                        confirmButton: 'swal-confirm'
                    }
                });
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Não foi possível enviar sua candidatura. Tente novamente mais tarde.',
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'swal-confirm'
                    }
                });
            }
        });

    });

    // Verificar se o usuário logado é uma empresa
    const empresaLogada = JSON.parse(localStorage.getItem('user'));

    // Condição para exibir o botão de deletar apenas para empresas
    if (vaga.empresa_id === empresaLogada.id && empresaLogada.origin === 'empresa') {
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
                let Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 700,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });

                Toast.fire({
                    icon: "success",
                    title: "Vaga removida com sucesso!"
                }).then(() => {
                    cardVaga.remove();
                });
            } else {
                const errorResponse = await deleteResponse.json();
                alert(errorResponse.message);
            }
        });
    }

    colunasCard.appendChild(infosVaga);
    colunasCard.appendChild(botoesVaga);
    cardVaga.appendChild(colunasCard);

    document.querySelector('.vagas').appendChild(cardVaga);
}

// Função para carregar vagas do servidor
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

// definir email no formulário
let email = document.getElementById('email').value = usuarioLogado.email

// Abrir formulário
let criarVaga = document.getElementById('criar_vaga').addEventListener('click', function (event) {
    formularioVaga.style.display = 'flex';
});

// Fechar formulário
let cancelarVaga = document.getElementById('cancelar_vaga').addEventListener('click', function (event) {
    formularioVaga.style.display = 'none';
    areaAtuacao.value = '';
    cidadeForm.value = '';
    estadoForm.value = '';
    qtd_vagasForm.value = '';
});

// Publicar vaga
let publicarVaga = document.getElementById('publicar_vaga');

publicarVaga.onclick = async function () {
    let area = document.getElementById('area_atuacao').value;
    let email_empresa = document.getElementById('email').value;
    let cidade = document.getElementById('cidade').value;
    let estado = document.getElementById('estado').value;
    let qtd_vagas = document.getElementById('qtd_vagas').value;
    let descricao = document.getElementById('descricao').value;

    // Recupera o ID e o nome da empresa logada
    const empresaLogada = JSON.parse(localStorage.getItem('user'));
    let empresa_id = empresaLogada.id;
    let nomeEmpresa = empresaLogada.nome; // Captura o nome da empresa

    if (!area || !email_empresa || !cidade || !estado || !qtd_vagas || !descricao || !empresa_id || !nomeEmpresa) {
        alert('Preencha todos os campos para publicar sua vaga!');
    } else {
        let data = { area, email_empresa, cidade, estado, qtd_vagas, descricao, empresa_id, nomeEmpresa };

        const response = await fetch('http://localhost:3001/api/store/vaga', {
            method: 'POST',
            headers: { 'Content-type': 'application/json;charset=UTF-8' },
            body: JSON.stringify(data)
        });

        let content = await response.json();

        if (content.success) {
            let Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 700,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            Toast.fire({
                icon: "success",
                title: "Vaga criada com sucesso!"
            }).then(() => {
                // Cria o card após o alerta ser exibido
                criarCardVaga({
                    id: content.vagaId,
                    area: area,
                    email_empresa: email_empresa,
                    cidade: cidade,
                    estado: estado,
                    qtd_vagas: qtd_vagas,
                    empresa_id: empresa_id,
                    nomeEmpresa: nomeEmpresa
                });

                // Oculta o formulário e reseta os campos
                formularioVaga.style.display = 'none';
                areaAtuacao.value = '';
                cidadeForm.value = '';
                estadoForm.value = '';
                qtd_vagasForm.value = '';
                descricao.value = '';

                // Recarrega a página
                location.reload();
            });
        } else {
            alert(content.message);
        }
    }
};

const filtrar = document.getElementById('filtrar').addEventListener('click', function () {
    const campoFiltro = document.getElementById('campo_filtrar');
    campoFiltro.style.display = 'flex';
    filtrar.style = 'background-color: #9CCDDB;'
});

const confirmarFiltro = document.getElementById('confirmar_filtro').addEventListener('click', function () {
    const tituloFiltro = document.getElementById('titulo_filtro').value.toLowerCase();
    const vagas = document.querySelectorAll('.card_vaga');  // Seleciona todos os cards de vagas

    vagas.forEach(vaga => {
        const tituloVaga = vaga.querySelector('.infos_vaga h3').textContent.toLowerCase();

        if (tituloVaga.includes(tituloFiltro)) {
            vaga.style.display = 'flex';
        } else {
            vaga.style.display = 'none';
        }
    });
});

const cancelarFiltro = document.getElementById('cancelar_filtro').addEventListener('click', function () {
    const campoFiltro = document.getElementById('campo_filtrar');
    const vagas = document.querySelectorAll('.card_vaga');
    const tituloFiltro = document.getElementById('titulo_filtro');

    campoFiltro.style.display = 'none';
    tituloFiltro.value = '';

    vagas.forEach(vaga => {
        vaga.style.display = 'flex';
    });
});

// Carregar vagas ao carregar a página
window.onload = function () {
    carregarVagas();
};