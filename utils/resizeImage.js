const fs = require('fs')
const sharp = require('sharp')

const resizeImage = (localPath, params) => {
    const readStream = fs.createReadStream(localPath);
    const transform = sharp();

    if (params.format) {
        transform = transform.toFormat(format);
    }

   if (params.width || params.height) {
       transform = transform.resize(params.width, params.height);
   }

    return readStream.pipe(transform).pipe(localPath);
}

module.exports = resizeImage