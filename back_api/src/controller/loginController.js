const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function Login(request, response) {
    const params = [
        request.body.email,
        request.body.senha,
        request.body.email,
        request.body.senha
    ];

  const query = "SELECT id, email, senha, 'usuariopf' AS origin FROM usuariospf WHERE email = ? AND senha = ? UNION SELECT id, email, senha, 'empresa' AS origin FROM empresas WHERE email = ? AND senha = ?";

  connection.query(query, params, (err, results) => {
    if (err) {
      response.status(400).json({
        success: false,
        message: "Erro ao realizar login",
        data: err
      });
    } else if (results && results.length > 0) {
      response.status(200).json({
        success: true,
        message: "Sucesso no Login!",
        data: results
      });
    } else {
      response.status(401).json({
        success: false,
        message: "Email ou senha inválidos",
        data: err
      });
    }
  });
}

module.exports = {
  Login
};