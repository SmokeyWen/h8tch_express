const {DB} = require('./constants/vars');
const MongoClient = require('mongodb').MongoClient;
// console.log('DB credentials:', process.env.DB);

// Create connection to MongoDB Atlas. param: db name, table name, callback function when success, callback function when fail
function initDB (h8tch_todo, todos, success, failure) {
    // build up connection
    MongoClient.connect(DB, function(err, dbInstance){
        if (err){
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failure(err);
        }
        else {
            // DB
            const dbObject = dbInstance.db(h8tch_todo);
            // table
            const dbCollection = dbObject.collection(todos);
            console.log('[MongoDB connection] Success...');

            // use db instance obj to close. pass to success callback for future closure
            success(dbInstance, dbCollection);
        }
    })
}

module.exports = {initDB};