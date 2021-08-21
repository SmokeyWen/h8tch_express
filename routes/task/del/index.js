const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');

router.delete('/', async(req, res) => {
    return res.json({msg : 'delete working'});
})

module.exports = router;