const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');

// Test DB connection
router.get('/', async (req, res) => {
    initDB.initDB(dbName, collectionName, function(instance, collection){
        collection.find().toArray( async function(err, result){
            if (err) throw err;
            // await instance.close(() => console.log('GET done. DB closed...'));
            return res.status(200).json(result);
        })
    })
})

module.exports = router;