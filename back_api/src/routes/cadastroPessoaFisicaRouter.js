const { Router } = require('express');
const { storeUsuario, Login, Infos } = require('../controller/cadastroPessoaFisicaController');

const router = Router();

router.post('/store/usuario', storeUsuario);
router.post('/post/login', Login);
router.get('/get/infosUser/:id', Infos)

module.exports = router;
