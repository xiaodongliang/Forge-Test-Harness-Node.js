

## Description
This sample demos the scenarios to aggregate 3D models and 2D drawings.


## Setup/Usage Instructions
 
* Apply for your own credentials (API keys) from [developer.autodesk.com](http://developer.autodesk.com)
* From the sample root folder, rename or copy the ./credentials_.js file into ./credentials.js <br />
  * Windows <br />
    ```
    copy credentials_.js credentials.js 
	```
  * OSX/Linux <br />
    ```
    cp credentials_.js credentials.js  
	```
* Replace the placeholders with your own keys in credentials.js <br />
  ```
  client_id: process.env.CONSUMERKEY || '<replace with your consumer key>',
  
  client_secret: process.env.CONSUMERSECRET || '<replace with your consumer secret>',
  ```
* Upload two models in folder [models](.\models) to your account and get their URNs using another workflow sample.
* 
* Copy the URNs which were generated in the previous step in file /www/js/main.js <br />Note: the URN needs to be base64 encoded <br />
  ```
  var model1_urn = '<replace with your encoded urn>';	// this is for 3D model and 2D drawings
  var model2_urn = '<replace with your encoded urn>';  // this is 3D model only

  ```
* Run the server from the Node.js console, by running the following command: <br />
  ```
  node server.js
  ```
* Connect to you local server using a WebGL-compatible browser: [http://localhost:3003/](http://localhost:3003/)
 

## License

That samples are licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.
 
