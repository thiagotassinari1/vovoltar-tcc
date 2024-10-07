const { Router } = require('express');
const { storeUsuarioEmpresa, InfosEmpresa, updateEmpresa } = require('../controller/cadastroEmpresaController');

const router = Router();

router.post('/store/UsuarioEmpresa', storeUsuarioEmpresa);
router.get('/get/infosUserEmpresa/:id', InfosEmpresa);
router.put('/update/infosEmpresa', updateEmpresa);

module.exports = router;