# sharp-server

A simple nodejs server that can resize and process images using [Sharp](https://sharp.pixelplumbing.com/page/api)


## Requirements
```sh
node 
```

## How to run it
```sh
git clone https://github.com/jsergiu/sharp-server.git sharp-server
cd sharp-server
yarn
node index.js
```

## How to use it

Accepted parameters
* url: image web address
* width: image width after resize (optional)
* height: image height after resize (optional)
* format: image output format (default depends will the user agent. ex: webp for chrome) 
* (soon) quality: percentage for the quality. Lower quality = smaller size
* (soon) filter: black & white, sepia, etc..

Example:
```sh
http://localhost:8000/api/image?url=http://placekitten.com/g/500/500&width=200&height=100&format=jpg
```