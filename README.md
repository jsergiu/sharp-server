# sharp-server

A simple nodejs server that can resize and process images using [Sharp](https://sharp.pixelplumbing.com/page/api)


## Requirements
```sh
node 
```

## How to run it
```sh
git clone https://github.com/jsergiu/sharp-server.git sharp-server
cd shape-server
yarn
node index.js
```

## How to use it
* url: image web address
* width: image width after resize (optional)
* height: image height after resize (optional)
* fomrat: image output format (optional, .png is default)

Example:
```sh
http://localhost:8000/api/image?url=http://placekitten.com/g/500/500&width=100
```