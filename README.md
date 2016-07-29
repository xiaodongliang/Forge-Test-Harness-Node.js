# Forge Test Harness by Node.js

## Description

This harness mainly for test endpoints or workflow of Data Management, Derivative, and Forge Viewer.

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
* Open a browser to visit `localhost:3000/upload.html`
* * Click `choose file` to select a model. Click [Translate this one for me]. 
* If it is a composite file (a root file links to other dependent files), compress all files to an zip and choose the zip. In addition, tick [Composite File], input the [Root File Name].
* Wait the process of translation completes. If it succeeds, a new item (urn) will be added to the list under `URN List`
* Click one item in the list, a new page will pop out to load the model from your Forge repository as usual. i.e. on-line model
 
## To Do
* Add resumable uploading

## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.
The Autodesk Viewer is not under MIT License but copyright by Autodesk, Inc.


## Written by

- [Xiaodong Liang](http://adndevblog.typepad.com/cloud_and_mobile/xiaodong-liang.html)

Autodesk Forge, 2016



