const { Router } = require('express');
const { storeUsuarioEmpresa, InfosEmpresa, updateEmpresa } = require('../controller/cadastroEmpresaController');

const router = Router();

/**
 * @swagger
 * /store/UsuarioEmpresa:
 *   post:
 *     summary: Cadastra uma nova empresa
 *     requestBody:
 *       description: Dados da empresa a ser cadastrada
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeEmpresa:
 *                 type: string
 *                 description: Nome da empresa
 *               email:
 *                 type: string
 *                 description: E-mail da empresa
 *               cnpj:
 *                 type: string
 *                 description: CNPJ da empresa
 *     responses:
 *       201:
 *         description: Empresa cadastrada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/store/UsuarioEmpresa', storeUsuarioEmpresa);

/**
 * @swagger
 * /get/infosUserEmpresa/{id}:
 *   get:
 *     summary: Retorna informações de uma empresa pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Informações da empresa retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nomeEmpresa:
 *                   type: string
 *                   description: Nome da empresa
 *                 email:
 *                   type: string
 *                   description: E-mail da empresa
 *                 cnpj:
 *                   type: string
 *                   description: CNPJ da empresa
 *       404:
 *         description: Empresa não encontrada
 */
router.get('/get/infosUserEmpresa/:id', InfosEmpresa);

/**
 * @swagger
 * /update/infosEmpresa:
 *   put:
 *     summary: Atualiza informações da empresa
 *     requestBody:
 *       description: Dados a serem atualizados
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeEmpresa:
 *                 type: string
 *                 description: Nome da empresa
 *               email:
 *                 type: string
 *                 description: E-mail da empresa
 *               cnpj:
 *                 type: string
 *                 description: CNPJ da empresa
 *     responses:
 *       200:
 *         description: Informações atualizadas com sucesso
 *       400:
 *         description: Erro na atualização
 */
router.put('/update/infosEmpresa', updateEmpresa);

module.exports = router;
