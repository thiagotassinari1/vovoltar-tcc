const connection = require('../config/db');
const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');

const caminhoFotoPerfil = path.join(__dirname, '..', 'uploads/fotos');

// Verifica se o diretório de logos existe; caso contrário, cria
if (!fs.existsSync(caminhoFotoPerfil)) {
  fs.mkdirSync(caminhoFotoPerfil);
}

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

async function updateFotoPerfilEmpresa(request, response) {
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
  
      const query = "UPDATE empresas SET ft_perfil = ? WHERE id = ?";
  
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

module.exports = {
    storeUsuarioEmpresa,
    InfosEmpresa,
    updateEmpresa,
    updateFotoPerfilEmpresa
};
