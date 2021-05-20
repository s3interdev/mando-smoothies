const { Router } = require('express');

const { auth } = require('../middleware/authMiddleware');
const { smoothiespageGet } = require('../controllers/smoothiesController');

const router = Router();

router.get('/smoothies', auth, smoothiespageGet);

module.exports = router;
