# Forge Test Harness by Node.js

## Description

This harness mainly for test aggregate models in Forge Viewer. In current version, only off-line mode has been written. I will add on-line model soon. 

The off-line models dataset and off-line libraries are from https://extract.autodesk.io 

## Setup

* $ npm install
* Request your own API keys from our developer portal [developer.autodesk.com](http://developer.autodesk.com).
* replace the credentials placeholders with your own keys or use ENV variables in `config-view-and-data.js`:

  client_Id: process.env.LMV_CONSUMERKEY || 'your key',
  
  client_Secret: process.env.LMV_CONSUMERSECRET || 'your secret'

* Modify scope per your test requirement.
* Set up the default bucket name defined by the `defaultBucketKey` variable.
* Configure the port in `server.js` per your requirement.

## Test

* $ node server.js 
* Open a browser to visit `localhost:3002/upload.html`
* A base model will be loaded in default.
* Click [Load Second Model], the second model will be loaded. 
* Click [Unload Second Model], the second model will be unloaded.
 
## To Do
* 

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.
The Autodesk Viewer is not under MIT License but copyright by Autodesk, Inc.


## Written by

- [Xiaodong Liang](http://adndevblog.typepad.com/cloud_and_mobile/xiaodong-liang.html)

Autodesk Forge, 2016



