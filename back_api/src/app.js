const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload')

const cors = require('cors');
const userpfRouter = require('./routes/cadastroPessoaFisicaRouter');
const vagaRouter = require('./routes/vagaRouter');
const userEmpresaRouter = require('./routes/cadastroEmpresaRouter');
const LoginRouter = require('./routes/loginRouter');
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// continuar - sepa fazer a aba "navegar" puxando todos currículos, pras empresas entrarem e explorarem os curriculos
app.use('/uploads', express.static(path.join(__dirname, "uploads")))

app.use('/api', userpfRouter);
app.use('/api', vagaRouter);
app.use('/api', userEmpresaRouter);
app.use('/api', LoginRouter);

module.exports = app;