const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeUsuarioEmpresa(request, response) {
    const params = [
        request.body.nome,
        request.body.email,
        request.body.cnpj,
        request.body.endereco,
        request.body.senha,
        request.body.ft_perfil
    ];

    const query = 'INSERT INTO empresas(nome,email,cnpj,endereco,senha,ft_perfil) VALUES(?,?,?,?,?,?)';

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Ops, deu problema!",
                data: err
            });
        }
    });
}

async function LoginEmpresa(request, response) {
    const params = [
        request.body.email,
        request.body.senha
    ];
    
    const query = "SELECT email, senha FROM empresas WHERE email = ? AND senha = ?";

    connection.query(query, params, (err, results) => {
        if (results && results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Sucesso no Login!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Problema no Login!",
                data: err
            });
        }
    });
}

module.exports = {
    storeUsuarioEmpresa,
    LoginEmpresa
};
