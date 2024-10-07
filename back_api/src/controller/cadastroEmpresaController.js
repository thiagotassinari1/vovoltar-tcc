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

async function InfosEmpresa(request, response) {
    const params = [
        request.params.id
    ];
    
    const query = "SELECT * FROM empresas WHERE id = ?";

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

async function updateEmpresa(request, response) {
    const id = request.body.id;
    const { nome, email, cnpj, endereco, sobre } = request.body;

    const params = [nome, email, cnpj, endereco, sobre, id];

    const query = `
        UPDATE empresas
        SET nome = ?, email = ?, cnpj = ?, endereco = ?, sobre = ?
        WHERE id = ?
    `;

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Dados da empresa atualizados com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao atualizar os dados da empresa!",
                data: err
            });
        }
    });
}


module.exports = {
    storeUsuarioEmpresa,
    InfosEmpresa,
    updateEmpresa // Exporte a função para atualizar os dados da empresa
};
