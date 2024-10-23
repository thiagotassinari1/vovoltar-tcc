const { Router } = require('express');
const { storeUsuario, InfosPessoa, infosUsuarioNavegar, updateCurriculo, updateUsuario } = require('../controller/cadastroPessoaFisicaController');

const router = Router();

/**
 * @swagger
 * /store/usuario:
 *   post:
 *     summary: Cadastra um novo usuário
 *     responses:
 *       201:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/store/usuario', storeUsuario);

/**
 * @swagger
 * /get/infosUser/{id}:
 *   get:
 *     summary: Retorna informações de um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Informações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/get/infosUser/:id', InfosPessoa);

/**
 * @swagger
 * /get/infosUsuarioNavegar:
 *   get:
 *     summary: Retorna as informações dos usuários para navegação
 *     responses:
 *       200:
 *         description: Lista de informações dos usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/get/infosUsuarioNavegar', infosUsuarioNavegar);

/**
 * @swagger
 * /update/curriculo:
 *   put:
 *     summary: Atualiza o currículo do usuário
 *     responses:
 *       200:
 *         description: Currículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/update/curriculo', updateCurriculo);

/**
 * @swagger
 * /update/infosUser:
 *   put:
 *     summary: Atualiza informações do usuário
 *     responses:
 *       200:
 *         description: Informações atualizadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/update/infosUser', updateUsuario);

module.exports = router;
