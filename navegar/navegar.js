document.addEventListener('DOMContentLoaded', async function (event) {
    event.preventDefault();

    // const usuarioLogado = JSON.parse(localStorage.getItem('user'));
    // const id = usuarioLogado.id;
    // console.log(id);
    // console.log(usuarioLogado.origin);

    const response = await fetch(`http://localhost:3001/api/get/infosUsuarioNavegar`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
    });

    let content = await response.json();
    console.log(content);

    if (content.success && content.data && content.data.length > 0) {
        const nome = content.data[0].nome;
        const area = content.data[0].area_atuacao;

        let recebe_nome = document.getElementById('recebe_nome');
        let recebe_area = document.getElementById('recebe_area');

        recebe_nome.textContent = nome;
        recebe_area.textContent = area;
    } else {
        alert('Erro para puxar os dados ou usuário não encontrado!');
    }
});
