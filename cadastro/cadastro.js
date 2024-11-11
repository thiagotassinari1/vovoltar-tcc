const button = document.getElementById('enviar');

button.onclick = async function() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const nascimento = document.getElementById('nascimento').value;
    const areaAtuacao = document.getElementById('area_atuacao').value;
    const senha = document.getElementById('input_senha').value;
    const ConfirmarSenha = document.getElementById('input_confirmar_senha').value;

    if (!nome || !email || !telefone || !nascimento || !areaAtuacao || !senha || !ConfirmarSenha) {
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
        let data = {nome,email,telefone,nascimento,areaAtuacao,senha}

        const response = await fetch('http://localhost:3001/api/store/usuario', {
            method: 'POST',
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(data)
        });
    
        let content = await response.json();
    
        if(content.success) {
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