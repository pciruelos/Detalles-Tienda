const express = require('express');
const router = express.Router();

const { renderIndex, renderContact, renderProducts } = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/contact',renderContact);

router.get('/products',renderProducts);

module.exports = router;