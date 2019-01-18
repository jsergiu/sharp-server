const fs = require('fs') 
const axios = require('axios')

const saveImageAsync = async (url, imagePath) => {
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

module.exports = saveImageAsync