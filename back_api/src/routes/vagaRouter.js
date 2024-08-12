// const { Router } = require('express');

// const router = Router();

// const { storeVaga } = require('../controller/vagaController');

// router.post('/store/vaga', storeVaga);

// module.exports = router;

// const { Router } = require('express');
// const { storeVaga, deleteVaga } = require('../controller/vagaController');

// const router = Router();

// router.post('/store/vaga', storeVaga);
// router.delete('/vaga/:id', deleteVaga);

// module.exports = router;

const { Router } = require('express');
const { storeVaga, deleteVaga, getVagas } = require('../controller/vagaController');

const router = Router();

router.post('/store/vaga', storeVaga);
router.delete('/vaga/:id', deleteVaga);
router.get('/vagas', getVagas);

module.exports = router;
