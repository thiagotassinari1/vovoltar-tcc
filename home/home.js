// transforma em objeto para conseguir buscar/manipular os dados do local storage
usuarioLogado = JSON.parse(localStorage.getItem('user'));
console.log(usuarioLogado);

console.log(usuarioLogado.id, usuarioLogado.email, usuarioLogado.senha, usuarioLogado.origin);

// criar função para deslogar do site e voltar para o login
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

const verEstagios = document.getElementById('ver_estagios').addEventListener('click', function() {
    window.location.href = '../estagios/estagios.html'
});