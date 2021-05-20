const { Router } = require('express');

const { homepageGet } = require('../controllers/homeController');

const router = Router();

router.get('/', homepageGet);

module.exports = router;
