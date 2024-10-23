const { Router } = require('express');
const { Login } = require('../controller/loginController');

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       description: Credenciais de login do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário ou e-mail
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Requisição inválida
 */
router.post('/login', Login);

module.exports = router;
