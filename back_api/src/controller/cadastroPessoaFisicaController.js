const fileUpload = require('express-fileupload');
const connection = require('../config/db');
const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const caminhoCurriculo = path.join(__dirname, '..', 'uploads/curriculos');
const caminhoFotoPerfil = path.join(__dirname, '..', 'uploads/fotos');

if (!fs.existsSync(caminhoCurriculo)) {
  fs.mkdirSync(caminhoCurriculo);
}

if (!fs.existsSync(caminhoFotoPerfil)) {
  fs.mkdirSync(caminhoFotoPerfil);
}

async function storeUsuario(request, response) {
  const params = [
    request.body.nome,
    request.body.email,
    request.body.telefone,
    request.body.nascimento,
    request.body.senha,
    request.body.areaAtuacao
  ];

  const query = 'INSERT INTO usuariospf(nome,email,telefone,nascimento,senha,area_atuacao) VALUES(?,?,?,?,?,?)';

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

async function infosUsuarioNavegar(request, response) {
  const query = "SELECT * FROM usuariospf";

  connection.query(query, (err, results) => {
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
        message: "Erro ao mover o arquivo do currículo",
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
          message: "Currículo atualizado com sucesso!",
          data: results
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Problema ao atualizar o currículo!",
          data: err
        });
      }
    });
  });
}

async function updateFotoPerfil(request, response) {
  const id = request.body.id;

  if (!request.files || !request.files.ft_perfil) {
    return response.status(400).json({
      success: false,
      message: "Nenhum arquivo foi enviado."
    });
  }

  const fotoPerfil = request.files.ft_perfil;
  const fotoNome = Date.now() + path.extname(fotoPerfil.name);

  fotoPerfil.mv(path.join(caminhoFotoPerfil, fotoNome), (erro) => {
    if (erro) {
      return response.status(400).json({
        success: false,
        message: "Erro ao mover o arquivo da foto de perfil: " + erro.message,
      });
    }

    const params = [
      fotoNome,
      id
    ];

    const query = "UPDATE usuariospf SET ft_perfil = ? WHERE id = ?";

    connection.query(query, params, (err, results) => {
      if (results) {
        response.status(200).json({
          success: true,
          message: "Foto de perfil atualizada com sucesso!",
          data: results
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Problema ao atualizar a foto de perfil!",
          data: err
        });
      }
    });
  });
}

async function updateUsuario(request, response) {
  const id = request.body.id;
  const { nome, email, telefone, nascimento, area_atuacao, sobre, instagram, facebook } = request.body;

  const params = [nome, email, telefone, nascimento, area_atuacao, sobre, instagram, facebook, id];
  
  const query = `
      UPDATE usuariospf 
      SET nome = ?, email = ?, telefone = ?, nascimento = ?, area_atuacao = ?, sobre = ?, instagram = ?, facebook = ?
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

async function removeFotoPerfil(request, response) {
  const id = request.body.id;

  const query = "SELECT ft_perfil FROM usuariospf WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err || results.length === 0) {
      return response.status(400).json({
        success: false,
        message: "Erro ao buscar foto de perfil!",
        data: err
      });
    }

    const fotoNome = results[0].ft_perfil;
    const filePath = path.join(caminhoFotoPerfil, fotoNome);

    fs.unlink(filePath, (erro) => {
      if (erro) {
        return response.status(400).json({
          success: false,
          message: "Erro ao apagar o arquivo da foto de perfil!",
          data: erro
        });
      }

      const deleteQuery = "UPDATE usuariospf SET ft_perfil = NULL WHERE id = ?";
      connection.query(deleteQuery, [id], (err, results) => {
        if (err) {
          return response.status(400).json({
            success: false,
            message: "Erro ao remover a foto de perfil do banco de dados!",
            data: err
          });
        }
        response.status(200).json({
          success: true,
          message: "Foto de perfil removida com sucesso!",
          data: results
        });
      });
    });
  });
}

module.exports = {
  storeUsuario,
  InfosPessoa,
  infosUsuarioNavegar,
  updateCurriculo,
  updateFotoPerfil,
  updateUsuario,
  removeFotoPerfil // Exporta a nova função
};