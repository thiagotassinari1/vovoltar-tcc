const { Router } = require('express');
const { storeVaga, deleteVaga, getVagas } = require('../controller/vagaController');

const router = Router();

/**
 * @swagger
 * /store/vaga:
 *   post:
 *     summary: Cadastra uma nova vaga
 *     requestBody:
 *       description: Dados da vaga a ser cadastrada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título da vaga
 *               descricao:
 *                 type: string
 *                 description: Descrição da vaga
 *               salario:
 *                 type: number
 *                 description: Salário oferecido
 *     responses:
 *       201:
 *         description: Vaga cadastrada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/store/vaga', storeVaga);

/**
 * @swagger
 * /vaga/{id}:
 *   delete:
 *     summary: Deleta uma vaga pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da vaga a ser deletada
 *     responses:
 *       200:
 *         description: Vaga deletada com sucesso
 *       404:
 *         description: Vaga não encontrada
 */
router.delete('/vaga/:id', deleteVaga);

/**
 * @swagger
 * /vagas:
 *   get:
 *     summary: Retorna uma lista de todas as vagas
 *     responses:
 *       200:
 *         description: Lista de vagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID da vaga
 *                   titulo:
 *                     type: string
 *                     description: Título da vaga
 *                   descricao:
 *                     type: string
 *                     description: Descrição da vaga
 *                   salario:
 *                     type: number
 *                     description: Salário oferecido
 *       404:
 *         description: Nenhuma vaga encontrada
 */
router.get('/vagas', getVagas);

module.exports = router;
