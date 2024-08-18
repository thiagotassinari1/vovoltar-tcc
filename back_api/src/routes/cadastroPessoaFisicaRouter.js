const { Router } = require('express');
const { storeUsuario, InfosPessoa } = require('../controller/cadastroPessoaFisicaController');

const router = Router();

router.post('/store/usuario', storeUsuario);
router.get('/get/infosUser/:id', InfosPessoa)

module.exports = router;
