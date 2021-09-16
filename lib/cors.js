module.exports = () => {
    return (_, response, next) => {
        response.setHeader('Access-Control-Allow-Origin', '*')
        next()
    }
}