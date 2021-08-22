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
    // console.log('task id:', targetId);
    if (targetId !== undefined){
        // console.log('deleting a specific task');
        const query = {"_id" : new ObjectId(targetId)};
        initDB.initDB(dbName, collectionName, function(instance, collection){
            collection.deleteOne(query)
            .then((result) => {
                collection.find().toArray( async (_err, _result) => {
                    if (_err) throw _err;
                    await instance.close(() => console.log('DELETE 1 task done. DB closed...'));
                    return res.status(200).json(_result);
                })
            })
            .catch((e) => console.log('Error in delete one task:', e))
        })
    }
    else {
        return res.json({msg : "Error in delete one task"})
    }
})

router.delete('/all', async(req, res) => {
    initDB.initDB(dbName, collectionName, function(instance, collection) {
        collection.deleteMany()
        .then( async (result) => {
            console.log('delete all result', result)
            await instance.close(() => console.log('DELETE all tasks done. DB closed...'));
            return res.status(200).json({msg : "All tasks deleted"})
        })
        .catch(err => console.log(err))
    })
})

module.exports = router;