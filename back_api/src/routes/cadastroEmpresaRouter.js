const { Router } = require('express');
const { storeUsuarioEmpresa, InfosEmpresa } = require('../controller/cadastroEmpresaController');

const router = Router();

router.post('/store/UsuarioEmpresa', storeUsuarioEmpresa);
router.get('/get/infosUserEmpresa/:id', InfosEmpresa);

module.exports = router;