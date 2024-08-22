const { Router } = require('express');
const { storeUsuario, InfosPessoa, updateCurriculo } = require('../controller/cadastroPessoaFisicaController');

const router = Router();

router.post('/store/usuario', storeUsuario);
router.get('/get/infosUser/:id', InfosPessoa);
router.put('/update/curriculo', updateCurriculo);

module.exports = router;
