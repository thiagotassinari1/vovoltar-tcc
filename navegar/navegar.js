const usuarioLogado = JSON.parse(localStorage.getItem('user'));
const idUsuarioLogado = usuarioLogado.id;
console.log(idUsuarioLogado);
console.log(usuarioLogado.origin);

const emailLogado = document.getElementById('email-usuario').textContent = usuarioLogado.email;

const logout = document.getElementById('botao-logout').addEventListener('click', function () {
    localStorage.removeItem('user');
    window.location.href = '../login/login.html'
});

document.addEventListener('DOMContentLoaded', async function (event) {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/api/get/infosUsuarioNavegar', {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    });

    let content = await response.json();
    console.log(content);

    if (content.success && content.data && content.data.length > 0) {
        const listagemUsuarios = document.getElementById('usuarios');
        listagemUsuarios.innerHTML = '';

        content.data.forEach(usuariospf => {
            listagemUsuarios.innerHTML += `
                <div class="card_usuario">
                    <p class="id_usuario" style="display: none">${usuariospf.id}</p>
                    <img class="img_usuario" src="../back_api/src/uploads/${usuariospf.ft_perfil}" alt="Imagem de perfil do usuário">
                    <div class="infos_usuario">
                        <div class="nome">
                            <h3 class="txt_info_usuario">Nome:</h3>
                            <p class="recebe_nome">${usuariospf.nome}</p>
                        </div>
                        <div class="area_atuacao">
                            <h3 class="txt_info_usuario">Área de atuação:</h3>
                            <p class="recebe_area">${usuariospf.area_atuacao}</p>
                        </div>
                    </div>
                    <div class="mais_info_usuario">
                        <button type="button" class="btn_mais_info" data-id="${usuariospf.id}">Mais informações</button>
                        <button type="button" class="btn_interesse" data-email="${usuariospf.email}" data-nome="${usuariospf.nome}">Demonstrar Interesse</button>
                    </div>
                </div>
            `;
        });

        const cardInfosUsuario = document.getElementById('card_infos_usuario');
        const fecharInfo = document.getElementById('fechar_info');

        // Lida com o clique no botão "Mais Informações"
        document.querySelectorAll('.btn_mais_info').forEach(button => {
            button.addEventListener('click', async function () {
                const id = button.getAttribute('data-id');

                const responseInfo = await fetch(`http://localhost:3001/api/get/infosUser/${id}`, {
                    method: "GET",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                });

                let contentInfo = await responseInfo.json();
                console.log(contentInfo);

                if (contentInfo.success) {
                    const { nome, email, telefone, nascimento, area_atuacao, curriculo, sobre } = contentInfo.data[0];

                    cardInfosUsuario.querySelector('.nome_info p').textContent = nome;
                    cardInfosUsuario.querySelector('.email_info p').textContent = email;
                    cardInfosUsuario.querySelector('.telefone_info p').textContent = telefone;
                    cardInfosUsuario.querySelector('.nascimento_info p').textContent = nascimento;
                    cardInfosUsuario.querySelector('.area_info p').textContent = area_atuacao;
                    cardInfosUsuario.querySelector('.curriculo_info p').textContent = curriculo;
                    cardInfosUsuario.querySelector('.sobre_info p').textContent = sobre;

                    // Exibe o card de informações do usuário
                    cardInfosUsuario.style.display = 'flex';
                } else {
                    alert('Erro ao puxar os dados!');
                }
            });
        });

        // Lida com o clique no botão "Demonstrar Interesse"
        document.querySelectorAll('.btn_interesse').forEach(button => {
            button.addEventListener('click', async function () {
                const email = button.getAttribute('data-email');
                const userName = button.getAttribute('data-nome');

                const response = await fetch('http://localhost:3001/api/email/sendInterestEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, userName }),
                });

                const result = await response.json();
                if (result.success) {
                    alert('Email enviado com sucesso para ' + userName + '!');
                } else {
                    alert('Erro ao enviar email: ' + result.message);
                }
            });
        });

        fecharInfo.addEventListener('click', function () {
            // Oculta o card de informações
            cardInfosUsuario.style.display = 'none';
        });
    } else {
        alert('Erro para puxar os dados ou usuário não encontrado!');
    }
});
