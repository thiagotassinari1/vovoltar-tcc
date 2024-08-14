let logarButton = document.getElementById('entrar_login');

logarButton.onclick = async function (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    if (!email || !senha ) {
        alert('Preencha todos os campos!')
        return false
    } else {
        let data = { email, senha };

        const response = await fetch('http://localhost:3001/api/post/login', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();
        console.log(content);

        if (content.success) {
            let tipo_usuario = 'pessoa';
            let id = content.data[0].id;

            // Salvar o usuário no local storage para ir pra home
            let usuario = JSON.stringify({ id, tipo_usuario  });
            localStorage.setItem('usuario', usuario);

            // Testar se está puxando o usuário corretamente
            console.log('Usuário armazenado no local storage:', usuario);

            Swal.fire({
                icon: "success",
                title: "Sucesso no login!",
                showConfirmButton: false,
                timer: 1300
            }).then(() => {
                window.location.href = '../home/home.html';
            });

        } else {
            alert('Erro no login, tente novamente!');
        }
    }
};