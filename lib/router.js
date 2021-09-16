'use strict'

const createExpressResponse = require('./response')

module.exports = () => {
    const routes = {
        get: {},
        post: {}
    }

    const handler = (request, response) => {
        const method = request.method.toLowerCase()
        const path = request.url
        const middlewares = routes[method][path]
        const expressResponse = createExpressResponse(response)

        let i = 0

        const next = () => {
            const nextMiddleware = middlewares[i++]

            if (nextMiddleware) {
                nextMiddleware(
                    request,
                    expressResponse,
                    next
                )
            }
        }

        next()
    }

    handler.get = (path, ...middlewares) => {
        routes.get[path] = middlewares
    }

    handler.post = (path, ...middlewares) => {
        routes.post[path] = middlewares
    }

    return handler
}
