const express = require('express')
const path = require('path')

// Utils
const getClientInfo = require('./utils/getClientInfo')
const getSharpParams = require('./utils/getSharpParams')
const ImageDownloader = require('./utils/ImageDownloader')
const resizeImage = require('./utils/resizeImage')

const app = express()
var PORT = 8000;

app.listen(PORT);
console.log(`Sharp-Server started on port ${PORT}`);


app.get('/', function (req, res) {
    res.send('Use /api/image?url=...&width=...')
})

app.get('/api/image', async function (req, res) {

    const imageSourceUrl = req.query.url

    //const clientInfo = getClientInfo(req.headers)
    const sharpParams = getSharpParams(req.query)

    // Download image to originals folder
    const imageDownloader = new ImageDownloader(imageSourceUrl)

    // Check if image is cached in originals folder. Download it otherwise
    let downloadPath = imageDownloader.getCachedImagePath()
    console.log(downloadPath)

    if (!downloadPath) {
        await imageDownloader.downloadImageAsync()
        downloadPath = path.resolve(__dirname, 'originals', imageDownloader.fileName)
    } else {
        console.log('Image found in cache')
    }

    // Resize and return
    res.type(imageDownloader.mimeType);
    resizeImage(downloadPath, sharpParams).pipe(res);
})