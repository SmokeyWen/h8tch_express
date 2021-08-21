const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');

// Test DB connection
router.get('/', async (req, res) => {
    initDB.initDB(dbName, collectionName, function(db){
        db.find().toArray(function(err, result){
            if (err) throw err;
            res.status(200).json(result);
        })
    })
})

module.exports = router;