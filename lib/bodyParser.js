module.exports = () => {
    return (request, _, next) => {
        let bodyStr = ''

        request.on('data', chunk => {
            bodyStr += chunk
        })

        request.on('end', () => {
            request.body = JSON.parse(bodyStr)
            next()
        })
    }
}