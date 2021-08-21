const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');

router.post('/', jsonParser, async(req, res) => {
    // console.log(req.body)
    // return res.json({msg : 'add working'});
    try {
        const payload = req.body;
        console.log('payload from post:', payload);
        initDB.initDB(dbName, collectionName, function(db){
            db.insertOne(payload, function(err, result){
                if (err) throw err;
                db.find().toArray((_err, _result) => {
                    if (_err) throw _err;
                    // console.log(result1);
                    res.status(200).json(_result);
                })
            })
        })
    }
    catch(e){
        return res.json({msg : e});
    }
})

module.exports = router;