require('dotenv').config()
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const user = require('./routers/user')
const auth = require('./routers/auth')
const question = require('./routers/question')
const answer = require('./routers/answer')

const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users', user)
app.use('/api/auth', auth)
app.use('/api/questions', question)
app.use('/api/answers', answer)

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
httpsServer.listen(443);
