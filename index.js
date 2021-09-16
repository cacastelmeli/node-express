'use strict'

const http = require('http')
const bodyParser = require('./lib/bodyParser')
const router = require('./lib/router')

const app = router()

const users = []

app.get('/users', (request, response, _) => {
    response
        .json({
            users
        })
})

app.post('/users', bodyParser(), (request, response) => {
    users.push(request.body)

    response.json({
        message: 'Usuario agregado!'
    })
})

http
    .createServer(
        (request, response) => app(request, response)
    )
    .listen(
        8000,
        () => console.log('Corriendo en http://localhost:8000')
    )
