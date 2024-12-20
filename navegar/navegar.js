const usuarioLogado = JSON.parse(localStorage.getItem('user'));
const idUsuarioLogado = usuarioLogado.id;
console.log(idUsuarioLogado);
console.log(usuarioLogado.origin);

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
            const fotoPerfil = usuariospf.ft_perfil ? `../back_api/src/uploads/fotos/${usuariospf.ft_perfil}` : '../assets/user2.png';
        
            listagemUsuarios.innerHTML += `
                <div class="card_usuario">
                    <p class="id_usuario" style="display: none">${usuariospf.id}</p>
                    <img class="img_usuario" src="${fotoPerfil}" alt="Imagem de perfil do usuário">
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
                        <button type="button" class="btn_mais_info" data-id="${usuariospf.id}" data-email="${usuariospf.email}" data-nome="${usuariospf.nome}">Mais informações</button>
                    </div>
                </div>
            `;
        });        

        const cardInfosUsuario = document.getElementById('card_infos_usuario');
        const fecharInfo = document.getElementById('fechar_info');
        const btnInteresseCard = document.getElementById('btn_interesse_card');

        if (usuarioLogado.origin === 'empresa') {
            btnInteresseCard.style.display = 'block'
        } else {
            btnInteresseCard.style.display = 'none'
        }

        // Lida com o clique no botão "Mais Informações"
        document.querySelectorAll('.btn_mais_info').forEach(button => {
            button.addEventListener('click', async function () {
                const id = button.getAttribute('data-id');
                const email = button.getAttribute('data-email');
                const userName = button.getAttribute('data-nome');

                const responseInfo = await fetch(`http://localhost:3001/api/get/infosUser/${id}`, {
                    method: "GET",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                });

                let contentInfo = await responseInfo.json();
                console.log(contentInfo);

                if (contentInfo.success) {
                    const { nome, email, telefone, nascimento, area_atuacao, curriculo, sobre } = contentInfo.data[0];

                    console.log(contentInfo[0])

                    cardInfosUsuario.querySelector('.nome_info p').textContent = nome;
                    cardInfosUsuario.querySelector('.email_info p').textContent = email;
                    cardInfosUsuario.querySelector('.telefone_info p').textContent = telefone;
                    cardInfosUsuario.querySelector('.nascimento_info p').textContent = nascimento;
                    cardInfosUsuario.querySelector('.area_info p').textContent = area_atuacao;
                    cardInfosUsuario.querySelector('.curriculo_info p').textContent = curriculo;
                    cardInfosUsuario.querySelector('.sobre_info p').textContent = sobre;

                    const curriculoInfo = cardInfosUsuario.querySelector('.curriculo_info p');
                    curriculoInfo.innerHTML = '';
                    
                    if (curriculo) {
                        // Cria o link para download do currículo
                        const downloadLink = document.createElement('a');
                        downloadLink.className = 'link_dowload_curriculo'
                        downloadLink.href = `../back_api/src/uploads/curriculos/${curriculo}`;
                        downloadLink.textContent = 'Baixar Currículo';
                        curriculoInfo.appendChild(downloadLink);
                    } else {
                        curriculoInfo.textContent = 'Nenhum currículo disponível.';
                    }

                    // Exibe o card de informações do usuário
                    cardInfosUsuario.style.display = 'flex';

                    // Atualiza a função do botão "Demonstrar Interesse" dentro do card
                    btnInteresseCard.onclick = async function () {

                        cardInfosUsuario.style.display = 'none';

                        const loadingAlert = Swal.fire({
                            title: "Enviando...",
                            didOpen: () => {
                                Swal.showLoading();
                            },
                            showConfirmButton: false,
                            allowOutsideClick: false
                        });

                        const empresaLogada = JSON.parse(localStorage.getItem('user'));
                        let empresa_id = empresaLogada.id;
                        let nomeEmpresa = empresaLogada.nome;
                    
                        const response = await fetch('http://localhost:3001/api/email/sendInterestEmail', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, userName, nomeEmpresa }),
                        });
                    
                        const result = await response.json();
                        
                        // Fecha o alerta de carregamento
                        loadingAlert.close();
                    
                        if (result.success) {
                            cardInfosUsuario.style.display = 'none';
                            Swal.fire({
                                icon: "success",
                                title: "Email enviado com sucesso!",
                                text: "Enviado para " + userName,
                                showConfirmButton: false,
                                timer: 1300
                            });
                        } else {
                            // Caso haja erro, mostrando o erro com Swal
                            Swal.fire({
                                icon: "error",
                                title: "Erro ao enviar email",
                                text: result.message || 'Tente novamente mais tarde.',
                                showConfirmButton: true
                            });
                        }
                    };                                    
                } else {
                    alert('Erro ao puxar os dados!');
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