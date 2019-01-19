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
    await imageDownloader.downloadImageAsync()
    const downloadPath = path.resolve(__dirname, 'originals', imageDownloader.fileName)

    // Resize and return
    res.type(imageDownloader.mimeType);
    resizeImage(downloadPath, sharpParams).pipe(res);
})