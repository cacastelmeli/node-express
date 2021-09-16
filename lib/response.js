module.exports = response => {
    const that = response

    that.status = nextStatus => {
        that.statusCode = nextStatus
        return that
    }

    that.json = obj => {
        that.setHeader('Content-Type', 'application/json')
        that.write(JSON.stringify(obj))
        that.end()
    }

    return that
}