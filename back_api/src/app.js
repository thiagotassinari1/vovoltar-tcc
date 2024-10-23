const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const userpfRouter = require('./routes/cadastroPessoaFisicaRouter');
const vagaRouter = require('./routes/vagaRouter');
const userEmpresaRouter = require('./routes/cadastroEmpresaRouter');
const LoginRouter = require('./routes/loginRouter');
const emailRouter = require('./routes/enviarEmailRouter'); // Adiciona o emailRouter

const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Configurar as rotas
app.use('/api', userpfRouter);
app.use('/api', vagaRouter);
app.use('/api', userEmpresaRouter);
app.use('/api', LoginRouter);
app.use('/api', emailRouter); // Inclui a nova rota para envio de e-mails

module.exports = app;
