const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');

router.post('/', async(req, res) => {
    return res.json({msg : 'add working'});
})

module.exports = router;