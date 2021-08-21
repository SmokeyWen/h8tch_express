const {DB} = require('./constants/vars');
const MongoClient = require('mongodb').MongoClient;
// console.log('DB credentials:', process.env.DB);

function initDB (h8tch_todo, todos, success, failure) {
    MongoClient.connect(DB, function(err, dbInstance){
        if (err){
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failure(err);
        }
        else {
            // DB
            const dbObject = dbInstance.db(h8tch_todo);
            // console.log('what is dbObject', dbObject);
            // table
            const dbCollection = dbObject.collection(todos);
            console.log('[MongoDB connection] Success!!!!!!');

            success(dbInstance, dbCollection);
        }
    })
}

async function closeDB () {
    console.log('did i start?')
    await MongoClient.close()
    .then(() => {
        console.log('DB connection closed!!!!!!')
    })
}

module.exports = {initDB, closeDB};