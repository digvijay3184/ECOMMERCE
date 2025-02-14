const express = require('express');

const {
    getFilterProducts,
} = require('../../controllers/shopping/productscontroller');

const router = express.Router();


router.get('/get', getFilterProducts);

module.exports = router;