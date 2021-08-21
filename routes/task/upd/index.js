const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');
const ObjectId = require('mongodb').ObjectId;

router.put('/', async(req, res) => {
    // return res.json({msg : 'update working'});
    const targetId = req.query.id;
    console.log('target id', targetId);
    const query = {"_id" : new ObjectId(targetId)}
    const projection = {"is_done" : 1};

    initDB.initDB(dbName, collectionName, function(db) {
        // find data with id. return only with is_done field
        db.findOne(query, projection)
        .then(result => {
            console.log('found result', result);
            const options = {upsert : false};
            let updateRow = {};
            if (result.is_done === 0){
                updateRow = {$set : {is_done : 1, updated_at : Date.now()}};
            }
            else {
                updateRow = {$set : {is_done : 0}};
            }
            db.updateOne(query, updateRow, options)
            .then(result1 => {
                // console.log('updated?', result1);
                db.find().toArray((_err, _result) => {
                    if (_err) throw _err;
                    res.status(200).json(_result);
                })
            })
        })
    })
})

module.exports = router;