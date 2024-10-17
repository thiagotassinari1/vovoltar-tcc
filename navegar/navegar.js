// const usuarioLogado = JSON.parse(localStorage.getItem('user'));
// const id = usuarioLogado.id;
// console.log(id);
// console.log(usuarioLogado.origin);

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
                    <img class="img_usuario" src="../back_api/src/uploads/${usuariospf.ft_perfil}" alt="Imagem de perfil do usuário">

                    <div class="infos_usuario">
                        <div class="nome">
                            <h3 class="txt_info_usuario">Nome:</h3>
                            <p class="recebe_nome" id="recebe_nome">${usuariospf.nome}</p>
                        </div>
                        <div class="area_atuacao">
                            <h3 class="txt_info_usuario">Área de atuação:</h3>
                            <p class="recebe_area" id="recebe_area">${usuariospf.area_atuacao}</p>
                        </div>
                    </div>

                    <div class="mais_info_usuario">
                        <button type="button" class="btn_mais_info" id="btn_mais_info"> Mais informações </button>
                    </div>
                </div>
            `;
        });

    } else {
        alert('Erro para puxar os dados ou usuário não encontrado!');
    }

    const card_infos_usuario = document.getElementById('card_infos_usuario');
    const fechar_info = document.getElementById('fechar_info');

    let btnMaisInfo = document.getElementById('btn_mais_info');
    btnMaisInfo.addEventListener('click', async function (event) {
        card_infos_usuario.style.display = 'block';
        listagemUsuarios.innerHTML += card_infos_usuario;
    });

    fechar_info.addEventListener('click', function() {
        card_infos_usuario.style.display = 'none'
    });
});