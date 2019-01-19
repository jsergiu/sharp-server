const fs = require('fs') 
const axios = require('axios')
const path = require('path')
const bcrypt = require('bcryptjs')

const imageFormats = require('../constants/imageFormats')

class ImageDownloader {

    constructor(imageSourceUrl) {
        // Location of the image that is being downloaded
        this.imageSourceUrl = imageSourceUrl

        // File extension of the downloaded image
        this.extension = imageFormats.imageExtensions.png

        // Mime type coresponsing the file extension
        this.mimeType = imageFormats.imageByMimeTypesByExtension[this.extension]

        // Image filename as is stored in the originals folder
        this.fileName = null
    }

    // Generate download path by using a hash
    getDownloadPath() {
        var hash = bcrypt.hashSync(this.imageSourceUrl)
            .replace(/[\\]/g, '')
            .replace(/[\/]/g, '')
            .replace(/\./g, '')
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
        this.extension = imageFormats.imageExtensionsByMimeType[this.mimeType]

        
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
}


module.exports = ImageDownloader