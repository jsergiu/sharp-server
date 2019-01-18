const { detectAll } = require('ua-spy')
const parse = detectAll()

const getClientInfo = (headers) => {
    const userAgent = parse(headers['user-agent'])
    return userAgent
}

module.exports = getClientInfo