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

module.exports = {
    storeUsuarioEmpresa,
    InfosEmpresa
};
