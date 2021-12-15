const express = require('express')

const { db } = require('D:\\Scaler Short url\\src\\models\\db.js')

const linksRoute  = require('./routes/links')

const redirectRoute = require('./routes/redirection')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
    response.send('Hello world!!!!')
})

app.use('/api/links', linksRoute)

app.use('/', redirectRoute)

db.sync({force: true }) // never force: true in prod it drops the dbs
.then(() => console.log('db works'))
.catch((err) => console.error(err))

app.listen(8080, () => {
    console.log('Server started on http://localhost:8080')
})