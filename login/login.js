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
            // Salvar o usuário no local storage para ir pra home
            let usuario = JSON.stringify({ email, tipo_usuario });
            localStorage.setItem('usuario', usuario);
            console.log('Usuário armazenado no local storage:', localStorage.getItem('usuario'));


            Swal.fire({
                title: "Sucesso no login!",
                text: "Clique em avançar para prosseguir.",
                imageUrl: "../assets/check.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                confirmButtonColor: "green",
                confirmButtonText: "Avançar",
                customClass: {
                    popup: 'box_popUp'
                }
                
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "../home/home.html";
                }
            });
        } else {
            alert('Erro no login, tente novamente!');
        }
    }
};