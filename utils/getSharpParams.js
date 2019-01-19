const imageFormats = require('../constants/imageFormats')

const getSharpParams = (requestQuery) => {

    let params = {
        format: 'png',
        mimeType: imageFormats.imageByMimeTypesByExtension['png'],
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