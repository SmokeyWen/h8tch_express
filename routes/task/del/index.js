const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const initDB = require('../../../db');
const {DB, dbName, collectionName} = require('../../../constants/vars');
const ObjectId = require('mongodb').ObjectId;

router.delete('/', async(req, res) => {
    // return res.json({msg : 'delete working'});
    const targetId = req.query.id;
    console.log('task id:', targetId);
    if (targetId !== undefined){
        console.log('deleting a specific task');
        const query = {"_id" : new ObjectId(targetId)};
        initDB.initDB(dbName, collectionName, function(db){
            db.deleteOne(query)
            .then((result) => {
                db.find().toArray((_err, _result) => {
                    if (_err) throw _err;
                    res.status(200).json(_result);
                })
            })
            .catch((e) => console.log('Error in delete one task:', e))
        })
    }
    else {
        console.log('deleting all tasks');
        initDB.initDB(dbName, collectionName, function(db) {
            db.deleteMany()
            .then(result => {
                return res.status(200).json({msg : "All tasks deleted"})
            })
            .catch(err => console.log(err))
        })
    }
})

module.exports = router;