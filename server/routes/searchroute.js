const express = require('express');
const router = express.Router();

router.get('/search', searchController.searchProducts);

module.exports = router;
