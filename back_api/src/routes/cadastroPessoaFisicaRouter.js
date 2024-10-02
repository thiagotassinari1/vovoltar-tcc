const { Router } = require('express');
const { storeUsuario, InfosPessoa, updateCurriculo, updateUsuario } = require('../controller/cadastroPessoaFisicaController');

const router = Router();

router.post('/store/usuario', storeUsuario);
router.get('/get/infosUser/:id', InfosPessoa);
router.put('/update/curriculo', updateCurriculo);
router.put('/update/infosUser', updateUsuario);

module.exports = router;
