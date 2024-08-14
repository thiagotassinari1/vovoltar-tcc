const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeUsuario(request, response) {
    const params = [
        request.body.nome,
        request.body.email,
        request.body.telefone,
        request.body.nascimento,
        request.body.senha,
        request.body.ft_perfil
    ];

    const query = 'INSERT INTO usuariospf(nome,email,telefone,nascimento,senha,ft_perfil) VALUES(?,?,?,?,?,?)';

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso no cadastro!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Problema no cadastro!",
                data: err
            });
        }
    });
}

async function Login(request, response) {
    const params = [
        request.body.email,
        request.body.senha
    ];
    
    const query = "SELECT * FROM usuariospf WHERE email = ? AND senha = ?";

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

async function Infos(request, response) {
    const params = [
        request.params.id
    ];
    
    const query = "SELECT * FROM usuariospf WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Sucesso no Get!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Problema no Get!",
                data: err
            });
        }
    });
}

module.exports = {
    storeUsuario,
    Login,
    Infos
};
