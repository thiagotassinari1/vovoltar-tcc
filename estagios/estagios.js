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