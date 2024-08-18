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

        const response = await fetch('http://localhost:3001/api/login', {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();
        console.log(content);

        if (content.success) {

            localStorage.setItem('user', JSON.stringify(content.data[0]))
            if (content.data[0].origin === 'usuariopf') {
                console.log('Usuário do tipo pessoa')
            } else {
                console.log('Usuário do tipo empresa')
            }

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