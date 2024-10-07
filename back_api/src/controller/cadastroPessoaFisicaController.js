const fileUpload = require('express-fileupload');
const connection = require('../config/db');
const dotenv = require('dotenv').config();

const fs = require('fs');
const path = require('path');

const caminhoCurriculo = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(caminhoCurriculo)) {
  fs.mkdirSync(caminhoCurriculo);
};

async function storeUsuario(request, response) {
  const params = [
    request.body.nome,
    request.body.email,
    request.body.telefone,
    request.body.nascimento,
    request.body.senha,
    request.body.ft_perfil,
    request.body.areaAtuacao
  ];

  const query = 'INSERT INTO usuariospf(nome,email,telefone,nascimento,senha,ft_perfil,area_atuacao) VALUES(?,?,?,?,?,?,?)';

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

async function InfosPessoa(request, response) {
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

async function updateCurriculo(request, response) {
  const id = request.body.id;
  const curriculo = request.files.curriculo;
  const curriculoNome = Date.now() + path.extname(curriculo.name);

  curriculo.mv(path.join(caminhoCurriculo, curriculoNome), (erro) => {
    if (erro) {
      return response.status(400).json({
        success: false,
        message: "Erro ao mover o arquivo",
      });
    }

    const params = [
      curriculoNome,
      id
    ];

    const query = "UPDATE usuariospf SET curriculo = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
      if (results) {
        response.status(200).json({
          success: true,
          message: "Sucesso no Get!",
          params: params,
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
  });
}

async function updateUsuario(request, response) {
  const id = request.body.id;
  const { nome, email, telefone, nascimento, area_atuacao, sobre } = request.body;

  const params = [nome, email, telefone, nascimento, area_atuacao, sobre, id];
  
  const query = `
      UPDATE usuariospf 
      SET nome = ?, email = ?, telefone = ?, nascimento = ?, area_atuacao = ?, sobre = ?
      WHERE id = ?
  `;

  connection.query(query, params, (err, results) => {
      if (results) {
          response.status(200).json({
              success: true,
              message: "Dados do cliente atualizados com sucesso!",
              data: results
          });
      } else {
          response.status(400).json({
              success: false,
              message: "Erro ao atualizar os dados do cliente!",
              data: err
          });
      }
  });
}


module.exports = {
  storeUsuario,
  InfosPessoa,
  updateCurriculo,
  updateUsuario // Exporte a função para atualizar o usuário
};