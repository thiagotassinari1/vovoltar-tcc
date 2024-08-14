let button = document.getElementById('enviar');

button.onclick = async function() {
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefone').value;
    let nascimento = document.getElementById('nascimento').value;
    let senha = document.getElementById('input_senha').value;
    let ConfirmarSenha = document.getElementById('input_confirmar_senha').value;

    if (!nome || !email || !telefone || !nascimento || !senha || !ConfirmarSenha) {
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
        let data = {nome,email,telefone,nascimento,senha}

        const response = await fetch('http://localhost:3001/api/store/usuario', {
            method: 'POST',
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            body: JSON.stringify(data)
        });
    
        let content = await response.json();
    
        if(content.success) {
            alert('Sucesso!');
        } else {
            alert('Algo deu errado, tente novamente!');
        }
    
        let reload = await content;
        reload = location.reload()
    }

}