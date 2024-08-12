const { Router } = require('express');
const { storeUsuarioEmpresa, LoginEmpresa } = require('../controller/cadastroEmpresaController');

const router = Router();

router.post('/store/UsuarioEmpresa', storeUsuarioEmpresa);
router.post('/post/loginEmpresa', LoginEmpresa);

module.exports = router;