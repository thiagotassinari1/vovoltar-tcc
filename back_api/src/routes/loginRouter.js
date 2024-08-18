const { Router } = require('express');
const { Login } = require('../controller/loginController');

const router = Router();

router.post('/login', Login);

module.exports = router;
