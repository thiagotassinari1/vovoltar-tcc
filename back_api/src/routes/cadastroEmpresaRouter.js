const { Router } = require('express');
const { storeUsuarioEmpresa, InfosEmpresa, updateEmpresa, updateFotoPerfilEmpresa, removeFotoPerfilEmpresa } = require('../controller/cadastroEmpresaController');

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
 *               nome:
 *                 type: string
 *                 description: Nome da empresa
 *               email:
 *                 type: string
 *                 description: E-mail da empresa
 *               cnpj:
 *                 type: string
 *                 description: CNPJ da empresa
 *               endereco:
 *                 type: string
 *                 description: Endereço da empresa
 *               senha:
 *                 type: string
 *                 description: Senha para login da empresa
 *               ft_perfil:
 *                 type: string
 *                 description: URL da foto de perfil
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
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *                 cnpj:
 *                   type: string
 *                 endereco:
 *                   type: string
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               endereco:
 *                 type: string
 *               sobre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informações atualizadas com sucesso
 *       400:
 *         description: Erro na atualização
 */
router.put('/update/infosEmpresa', updateEmpresa);

/**
 * @swagger
 * /update/logoEmpresa:
 *   put:
 *     summary: Atualiza o logo da empresa
 *     requestBody:
 *       description: Arquivo de imagem do logo a ser atualizado
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID da empresa
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem do logo
 *     responses:
 *       200:
 *         description: Logo atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o logo
 */
router.put('/update/logoEmpresa', updateFotoPerfilEmpresa);

/**
 * @swagger
 * /remove/fotoPerfil:
 *   delete:
 *     summary: Remove a foto de perfil do usuário
 *     responses:
 *       200:
 *         description: Foto de perfil removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/remove/fotoPerfilEmpresa', removeFotoPerfilEmpresa);

module.exports = router;
