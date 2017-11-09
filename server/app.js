const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const mongoose = require('mongoose')
//----------------------------------------------------------
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))

var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb://Indraprahastha:Pancasila-85@cluster0-shard-00-00-ubshk.mongodb.net:27017,cluster0-shard-00-01-ubshk.mongodb.net:27017,cluster0-shard-00-02-ubshk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

mongoose.connect(uri, err => {
  if(err) {
    console.log('errrorrrrr=====>',err);
  }
  else {
    // console.log('normal');
  }
});
var db = mongoose.connection;
//----------------------------------------------------------
let user = require('./routers/user-router.js')
let question = require('./routers/question-router.js')
let answer = require('./routers/answer-router.js')
let grup = require('./routers/grup-router.js')
let loginfb = require('./routers/loginfb.js')
//----------------------------------------------------------
app.use('/user',user)
app.use('/question',question)
app.use('/answer',answer)
app.use('/grup',grup)
app.use('/loginfb',loginfb)

app.listen(process.env.PORT || 3000, function(){
  // console.log('Hacktivoverflow Jalan');
})
