const { Router } = require('express');
const { sendInterestEmail } = require('../controller/enviarEmailController');

const router = Router();

/**
 * @swagger
 * /email/sendInterestEmail:
 *   post:
 *     summary: Envia um e-mail de interesse
 *     requestBody:
 *       description: Dados necessários para enviar o e-mail de interesse
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail do destinatário
 *               message:
 *                 type: string
 *                 description: Conteúdo do e-mail
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status da operação
 *       400:
 *         description: Requisição inválida
 */
router.post('/email/sendInterestEmail', sendInterestEmail);

module.exports = router;
