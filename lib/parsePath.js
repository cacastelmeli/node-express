'use strict'

const MATCH_IDENTIFIERS = /:(\w+)/g

module.exports = path => {
    const identifiers = []
    const replacedPath = path.replace(MATCH_IDENTIFIERS, (_, identifier) => {
        identifiers.push(identifier)

        return '([^/]+)'
    })

    return {
        identifiers,
        regex: new RegExp(`^${replacedPath}$`)
    }
}