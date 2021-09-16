'use strict'

const parsePath = require('./parsePath')
const createExpressResponse = require('./response')

module.exports = () => {
    const routes = {
        get: [],
        post: []
    }

    const handler = (request, response) => {
        const method = request.method.toLowerCase()
        const path = request.url
        const routesByMethod = routes[method]
        const expressResponse = createExpressResponse(response)

        let middlewares = []

        for (const route of routesByMethod) {
            const match = route.regex.exec(path)

            if (match) {
                const params = {}

                for (let i = 0; i < route.identifiers.length; i++) {
                    params[route.identifiers[i]] = match[i + 1]
                }

                request.params = params
                middlewares = route.middlewares
                break
            }
        }

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
        routes.get.push({
            ...parsePath(path),
            middlewares
        })
    }

    handler.post = (path, ...middlewares) => {
        routes.post.push({
            ...parsePath(path),
            middlewares
        })
    }

    return handler
}
