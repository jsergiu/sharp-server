const imageFormats = require('./constants/imageFormats')

const config = {
    defaultInputExtension: imageFormats.extensionsObject.png,
    defaultOutputExtension: imageFormats.extensionsObject.png,
    originalsFolderName: 'originals',
}

module.expors = config