const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');

router.put('/', async(req, res) => {
    return res.json({msg : 'update working'});
})

module.exports = router;