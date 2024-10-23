const { Router } = require('express');
const { sendInterestEmail } = require('../controller/enviarEmailController');

const router = Router();

router.post('/email/sendInterestEmail', sendInterestEmail);

module.exports = router;
