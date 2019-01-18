const express = require('express')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const axios = require('axios')
const bcrypt = require('bcrypt-nodejs')

// Utils
const getClientInfo = require('./utils/getClientInfo')
const getSharpParams = require('./utils/getSharpParams')
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
    res.send('hello world')
})

async function downloadImage (url) {
    const imagePath = path.resolve(__dirname, 'images', 'code.jpg')
    const writer = fs.createWriteStream(imagePath)
  
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
  
    response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

app.get('/api/image', async function (req, res) {

    const imageUrl = req.query.url

    const clientInfo = getClientInfo(req.headers)
    const sharpParams = getSharpParams(req.query)
    
    console.log(clientInfo)
    console.log(sharpParams)
    
    downloadImage(imageUrl)
        .then(response => {
            // Set the content-type of the response
            res.type(sharpParams.mimeType);
        
            // Get the resized image
            resizeImage(image, sharpParams).pipe(res);
            
        })
        .catch(error => {
            console.log('error')
            console.log(error)
        })

   
})