const extensionsArray = ['bmp', 'gif', 'jpg', 'png', 'svg', 'tiff', 'webp']

const extensionsObject = {
    'bmp': 'bmp',
    'gif': 'gif',
    'jpg': 'jpg',
    'jpg': 'jpg',
    'png': 'png',
    'svg': 'svg',
    'tiff': 'tiff',
    'webp': 'webp',
}

const extensionsByMimeType = {
    'image/bmp': 'bmp',
    'image/gif': 'gif',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'image/tiff': 'tiff',
    'image/webp': 'webp',
}

const mimeTypesByExtension = {
    'bmp': 'image/bmp',
    'gif': 'image/gif',
    'jpg': 'image/jpeg',
    'jpg': 'image/jpg',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'tiff': 'image/tiff',
    'webp': 'image/webp',
}


module.exports = {
    extensionsArray,
    extensionsObject,
    extensionsByMimeType,
    mimeTypesByExtension
}