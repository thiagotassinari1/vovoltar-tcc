const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');
const userpfRouter = require('./routes/cadastroPessoaFisicaRouter');
const vagaRouter = require('./routes/vagaRouter');
const userEmpresaRouter = require('./routes/cadastroEmpresaRouter');
const LoginRouter = require('./routes/loginRouter');
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());

app.use('/api', userpfRouter);
app.use('/api', vagaRouter);
app.use('/api', userEmpresaRouter);
app.use('/api', LoginRouter);

module.exports = app;