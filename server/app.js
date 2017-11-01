require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const user = require('./routers/user')
const auth = require('./routers/auth')
const question = require('./routers/question')

const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users', user)
app.use('/api/auth', auth)
app.use('/api/questions', question)

app.listen(3000)
