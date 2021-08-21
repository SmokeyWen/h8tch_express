const express = require('express');
const router = express.Router();

// Collect sub paths
const add = require('./add');
const upd = require('./upd');
const del = require('./del');
const get = require('./get');

// Apply sub path routers
router.use('/add', add);
router.use('/upd', upd);
router.use('/del', del);
router.use('/get', get);

module.exports = router;