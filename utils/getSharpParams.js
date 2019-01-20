const config = require('../config')
const imageFormats = require('../constants/imageFormats')


const getSharpParams = (requestQuery) => {

    let params = {
        format: config.defaultOutputExtension,
        mimeType: imageFormats.mimeTypesByExtension[config.defaultOutputExtension],
        width: null,
        height: null,
    }

    if (requestQuery.width) {
        params.width = parseInt(requestQuery.width);
    }

    if (requestQuery.height) {
        params.height = parseInt(requestQuery.height);
    }

    return params
}

module.exports = getSharpParams