const button = document.getElementById('enviar');

button.onclick = async function() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const cnpj = document.getElementById('cnpj').value;
    const endereco = document.getElementById('endereco').value;
    const senha = document.getElementById('input_senha').value;
    const ConfirmarSenha = document.getElementById('input_confirmar_senha').value;

    if (!nome || !email || !cnpj || !endereco || !senha || !ConfirmarSenha) {
        alert('Preencha todos os campos!');
        return false
    } else if (!email.includes('@')) {
        alert('Email inválido!')
        return false
    } else if ( senha != ConfirmarSenha) {
        alert('Confirme sua senha!')
        return false
    } else if (senha.length < 8 || ConfirmarSenha.length < 8) { 
        alert('Indique uma senha com no mínimo 8 caracteres!')
        return false
    } else {
        let data = {nome,email,cnpj,endereco,senha}

        const response = await fetch('http://localhost:3001/api/store/UsuarioEmpresa', {
            method: 'POST',
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(data)
        });
    
        let content = await response.json();
    
        if (content.success) {
            Swal.fire({
                icon: "success",
                title: "Sucesso no cadastro!",
                showConfirmButton: false,
                timer: 1300
            }).then(() => {
                window.location.href = '../login/login.html';
            });
        } else {
            alert('Algo deu errado, tente novamente!');
        }
    }

}