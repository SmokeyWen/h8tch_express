require('dotenv').config()
const express = require('express');
const app = express();

// const index = require('./routes');

const cors = require('cors');
const PORT = process.env.PORT || 8080;


// Mongoose.connect(
//     DB,
//     {useUnifiedTopology : true, useNewUrlParser : true
// })
// .then (() => {
//     console.log('db connected')
// })
// .catch(e => console.log(e))

app.use(cors());
// app.use('/', index);

app.get('/', (req, res) => {
    res.status(200).json({status : 'server up'});
    
})

app.listen( PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
})


module.exports = app;