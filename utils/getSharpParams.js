const getSharpParams = (requestQuery) => {

    let params = {
        format: 'png',
        mimeType: 'image/png',
        width: null,
        height: null,
    }

    if (requestQuery.width) {
        params.width = parseInt(widthString);
    }

    if (requestQuery.height) {
        height = parseInt(requestQuery.height);
    }

    return params
}

module.exports = getSharpParams