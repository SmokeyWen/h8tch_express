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
        // console.log('payload from post:', payload);
        initDB.initDB(dbName, collectionName, function(instance, collection){
            collection.insertOne(payload, function(err, result){
                if (err) throw err;
                collection.find().toArray( async (_err, _result) => {
                    if (_err) throw _err;
                    // console.log(result1);
                    await instance.close(() => console.log('ADD done. DB closed...'));
                    return res.status(200).json(_result);
                    
                })
            })
            
            
        })
        // initDB.closeDB();
    }
    catch(e){
        return res.json({msg : e});
    }
})

module.exports = router;