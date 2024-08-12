const { Router } = require('express');
const { storeUsuario, Login } = require('../controller/cadastroPessoaFisicaController');

const router = Router();

router.post('/store/usuario', storeUsuario);
router.post('/post/login', Login);

module.exports = router;
