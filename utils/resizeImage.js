const fs = require('fs')
const sharp = require('sharp')

const resizeImage = (localPath, params) => {
    const readStream = fs.createReadStream(localPath);
    let transformer = sharp();

    if (params.format) {
        transformer = transformer.toFormat(params.format);
    }

   if (params.width || params.height) {
       transformer = transformer.resize(params.width, params.height);
   }

    return readStream.pipe(transformer);
}

module.exports = resizeImage