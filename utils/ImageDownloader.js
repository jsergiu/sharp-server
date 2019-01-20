const fs = require('fs') 
const axios = require('axios')
const path = require('path')
var md5 = require('blueimp-md5')

const imageFormats = require('../constants/imageFormats')

class ImageDownloader {

    constructor(imageSourceUrl) {
        // Location of the image that is being downloaded
        this.imageSourceUrl = imageSourceUrl

        // File extension of the downloaded image
        this.extension = imageFormats.extensionsObject.png

        // Mime type coresponsing the file extension
        this.mimeType = imageFormats.mimeTypesByExtension[this.extension]

        // Image filename as is stored in the originals folder
        this.fileName = null
    }

    // Generate download path by using a hash
    getDownloadPath() {
        var hash = md5(this.imageSourceUrl)
        this.fileName = hash + '.' + this.extension
        const downloadPath = path.resolve(__dirname, '../originals', this.fileName)

        return downloadPath
    }

    async downloadImageAsync() {
        const response = await axios({
            url: this.imageSourceUrl,
            method: 'GET',
            responseType: 'stream'
        })

        this.mimeType = response.headers['content-type'] || this.mimeType
        this.extension = imageFormats.extensionsByMimeType[this.mimeType]

        
        if (!this.extension) {
            throw new Error('Unknown mime type')
        }
        
        const downloadPath = this.getDownloadPath()

        // Create a steam and return it
        const writer = fs.createWriteStream(downloadPath)
        response.data.pipe(writer)
    
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
        })
    }

    /**
     * Check if image already exists in the originals folder
     * @returns {String} or false
     */
    getCachedImagePath() {
        const hash = md5(this.imageSourceUrl)
        let result = false

        imageFormats.extensionsArray.forEach(extension => {
            let filePath = path.resolve(__dirname, '../originals', hash + '.' + extension)

            if (fs.existsSync(filePath)) {
                result = filePath
            }
        });

        return result
    }

}


module.exports = ImageDownloader