const express = require('express');
const router = express.Router();

const task = require('./task');

// Initialize path localhost:8080/task
router.use('/task', task);

module.exports = router;