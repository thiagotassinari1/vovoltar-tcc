const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeVaga(request, response) {
    const params = [
        request.body.area,
        request.body.email_empresa,
        request.body.cidade,
        request.body.estado,
        request.body.qtd_vagas,
        request.body.empresa_id, // empresa_id será enviado no request
    ];

    const query = 'INSERT INTO vagas(area,email_empresa,cidade,estado,qtd_vagas,empresa_id) VALUES(?,?,?,?,?,?)';

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso!",
                vagaId: results.insertId // Retorna o ID da nova vaga
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

async function deleteVaga(request, response) {
    const vagaId = request.params.id;

    const query = 'DELETE FROM vagas WHERE id = ?';

    connection.query(query, [vagaId], (err, results) => {
        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Vaga deletada com sucesso"
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Vaga não encontrada"
            });
        }
    });
}

async function getVagas(request, response) {
    const query = 'SELECT * FROM vagas';

    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                vagas: results
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

module.exports = {
    storeVaga,
    deleteVaga,
    getVagas
};
