const express =  require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const {MOGOURI, MONGOURI}  = require('./valueKeys.js')

mongoose.connect(MONGOURI);;

require("./models/user.js");
require("./models/post.js");
mongoose.connection.on('connected',()=>{
    console.log("We are connected to the server ie mongodb")
})

mongoose.connection.on('error',()=>{
    console.log("We are not connected to the server ie mongodb")
})


app.use(express.json()); 
app.use(require('./routes/authen.js'))
app.use(require('./routes/post.js'))


app.listen(PORT,()=>{
    console.log("server is running at",PORT)
})