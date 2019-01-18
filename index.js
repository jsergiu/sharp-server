const express = require('express')
const fs = require('fs')
const path = require('path') 
const axios = require('axios')
const bcrypt = require('bcrypt-nodejs')

// Utils
const getClientInfo = require('./utils/getClientInfo')
const getSharpParams = require('./utils/getSharpParams')
const saveImageAsync = require('./utils/saveImageAsync')
const resizeImage = require('./utils/resizeImage')
 
const app = express()
var PORT = 8000;


/**
 * [X] Get client data
 * [X] Get params
 * Try to find the original in cache
 * If not found, fetch the original from the url
 * Store the original to /originals/domain.com
 * Resize and return the resized image
 */

app.listen(PORT);
console.log(`Express started on port ${PORT}`);


app.get('/', function (req, res) {
    res.send('Use /api/image?url=...&width=...')
})

app.get('/api/image', async function (req, res) {

    const imageUrl = req.query.url

    const clientInfo = getClientInfo(req.headers)
    const sharpParams = getSharpParams(req.query)
    
    console.log("\nClient info: \n", clientInfo, '\n')
    console.log("\nParams info: \n", sharpParams, '\n')
    
    const imagePath = path.resolve(__dirname, 'originals', 'img.jpg')
    await saveImageAsync(imageUrl, imagePath)

    res.type(sharpParams.mimeType);
    resizeImage(imagePath, sharpParams).pipe(res);

    
})