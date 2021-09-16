'use strict'

const http = require('http')
const bodyParser = require('./lib/bodyParser')
const cors = require('./lib/cors')
const router = require('./lib/router')

const app = router()

const users = []

app.get('/users/:id/detail', (request, response) => {
    response.json({
        id: request.params.id
    })
})

app.get('/users', cors(), (request, response, _) => {
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
