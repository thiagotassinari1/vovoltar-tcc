const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Rotas",
      version: "1.0.0",
      description: "API CRUD para gerenciar rotas",
    },
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: [`${__dirname}/routes/*.js`], // caminho para as rotas
};

const app = require('./app');
const port = app.get('port');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Rodando na porta ${port}`));