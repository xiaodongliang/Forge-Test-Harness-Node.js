var _viewer3D  = null;
var _viewer2D  = null;

var _toLoadModelIndex = -1;
 
var token = null;

// this model includes some 2D drawings for testing the scenario of aggregating 2D drawings.
var model1_urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRza3Rlc3QyMDE3L3Jldml0YWR2YW5jZWQucnZ0';
//this model is pure 3D model. for testing the scenario of aggregating 3D models.
var model2_urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRza3Rlc3QyMDE3L3NtYWxsaG91c2UucnZ0';


var model1_viewerable3D_path;
var model1_viewerable2D_path;

var model2_viewerable3D_path;


//the models are from two different models

var _3D_models =
    [
        {   modelName:'3D-Model1',
            urn:model1_urn,
            viewModel:null,
            viewrablepath:null
        },
        {   modelName:'3D-Model2',
            urn:model2_urn,
            viewModel:null,
            viewrablepath:null

        }
      ];

//the drawings are from the same model
var _2D_models =
    [
        {
            modelName:'2D-Drawing1',
            urn:model1_urn,
             viewModel:null,
            viewrablepath:null

        },
        {
            modelName:'2D-Drawing2',
            urn:model1_urn,
             viewModel:null,
            viewrablepath:null

        }
       
    ]; 

 function _onGeometryLoaded(event)
{
    var viewer = event.target;
    viewer.removeEventListener(
         Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
        _onGeometryLoaded);

    if(viewer.model.is2d()){
             _2D_models[_toLoadModelIndex].viewModel = event.model;
 
            //*****this way does not work with 2D drawing
             //and it looks the 2D drawings layer panel does not run into getObjectTree
            //it falls into a workflow of layers seperately.

            //event.model.getObjectTree(function (instanceTree){
                //viewer.modelstructure.setModel(instanceTree);
            //});
            //******/

            //maybe this method could help? 
           // viewer.layersPanel.setLayers();
           //or manipulate initLayersTexture ?

    }
    else
    {
        _3D_models[_toLoadModelIndex].viewModel = event.model;

        //this can switch the model tree to the newest loaded model
        event.model.getObjectTree(function (instanceTree){
            viewer.modelstructure.setModel(instanceTree);
            viewer.model =  event.model;

            viewer.impl.model =  event.model;
        });
    }
}



function dumpDocuments(modelindex,cb3d, cb2d) {
  

            Autodesk.Viewing.Document.load(_3D_models[modelindex].urn,

                // onSuccessCallback
                function (document) {

                    var geometryItems3D = Autodesk.Viewing.Document.getSubItemsWithProperties(document.getRootItem(), {
                                'type': 'geometry',
                                'role': '3d'
                            }, true);

                        
                     _3D_models[modelindex].viewrablepath =document.getViewablePath(geometryItems3D[0]); 


                    if(modelindex == 0)  //get 2D drawings because they are from the same model (urn)
                    { 
                        var geometryItems2D = Autodesk.Viewing.Document.getSubItemsWithProperties(document.getRootItem(), {
                            'type': 'geometry',
                            'role': '2d'
                        }, true);


                        _2D_models[0].viewrablepath =document.getViewablePath(geometryItems2D[0]); 
                        _2D_models[1].viewrablepath =document.getViewablePath(geometryItems2D[1]);  

                        _toLoadModelIndex = modelindex;

                         //to load the first 2D drawing
                         _viewer2D.load(_2D_models[0].viewrablepath, null, function () {if (cb2d) cb2d();});
                          //to load the first 3D model
                         _viewer3D.load(document.getViewablePath(geometryItems3D[0]), null, function () {if (cb3d) cb3d();});


                    }   

                },

                // onErrorCallback
                function (msg) {
                console.log("Error loading document: " + msg);
                }
            ); 
}


 
function dumpDocumentsAndLoadFirstModel()
{
    var options = {
      env: "AutodeskProduction",
      accessToken: token  
    };

    Autodesk.Viewing.Initializer(options, function () {


    _viewer3D = new Autodesk.Viewing.Private.GuiViewer3D(
        document.getElementById('viewer3D'));
    _viewer2D = new Autodesk.Viewing.Private.GuiViewer3D(
        document.getElementById('viewer2D'));
 
        _viewer3D.addEventListener(
            Autodesk.Viewing.GEOMETRY_LOADED_EVENT, _onGeometryLoaded);
        _viewer2D.addEventListener(
            Autodesk.Viewing.GEOMETRY_LOADED_EVENT, _onGeometryLoaded);
 
        _viewer3D.start(); 
        _viewer2D.start(); 

        dumpDocuments(0); 
        dumpDocuments(1);  
 

    });
}


function loadViewerModel(viewer,modelindex,is2d)
{
    

    var options = {
      env: "AutodeskProduction",
       accessToken: token  
    };

    var mat = new THREE.Matrix4();

    mat.makeTranslation(50,50,0);
    var loadOptions = {
        placementTransform:  mat,
        modelSpace:true
    };

    if(is2d){
        viewer.loadModel(_2D_models[modelindex].viewrablepath ,loadOptions);
    }
    else{
        viewer.loadModel(_3D_models[modelindex].viewrablepath ,loadOptions);

    }

    _toLoadModelIndex = modelindex;
     viewer.addEventListener(
        Autodesk.Viewing.GEOMETRY_LOADED_EVENT, _onGeometryLoaded);

}
 
 var initOptions = {

  documentId: model1_urn,

  env: 'AutodeskProduction',

  getAccessToken: function(onGetAccessToken) {

   
  }
};

$(document).ready (function () {
 

   $.get('/api/token', function(tokenResponse) {

        token  = JSON.parse(tokenResponse).access_token;  

        dumpDocumentsAndLoadFirstModel();
    })

           
      $('#btnloadsecond3d').click (function (evt) {
            loadViewerModel(_viewer3D,1);
      });

       $('#btnloadsecond2d').click (function (evt) {
            loadViewerModel(_viewer2D,1,true);

      });

       $('#btnswitchfirst3D').click (function (evt) {
 
            //this can switch the model tree to the newest loaded model
            var activatedModel = _3D_models[0].viewModel;
            activatedModel.getObjectTree(function (instanceTree){
                _viewer3D.modelstructure.setModel(instanceTree);
                _viewer3D.model =  activatedModel;

                _viewer3D.impl.model =  activatedModel;
            });
      });

       $('#btnswitchsecond3D').click (function (evt) {
           //this can switch the model tree to the newest loaded model
            var activatedModel = _3D_models[1].viewModel;
            activatedModel.getObjectTree(function (instanceTree){
                _viewer3D.modelstructure.setModel(instanceTree);
                _viewer3D.model =  activatedModel;

                _viewer3D.impl.model =  activatedModel;
            });
      });
       $('#btnswitchfirst2D').click (function (evt) {

            var activatedModel = _2D_models[0].viewModel;

            //*****this way does not work with 2D drawing
             //and it looks the 2D drawings layer panel does not run into getObjectTree
            //it falls into a workflow of layers seperately.

            //event.model.getObjectTree(function (instanceTree){
                //_viewer2D.modelstructure.setModel(instanceTree);
            //});
            //******/

            //maybe this method could help? 
             // viewer.layersPanel.setLayers();
           //or manipulate initLayersTexture ?
      });

       $('#btnswitchsecond2D').click (function (evt) {
             var activatedModel = _2D_models[0].viewModel;

            //*****this way does not work with 2D drawing
             //and it looks the 2D drawings layer panel does not run into getObjectTree
            //it falls into a workflow of layers seperately.

            //event.model.getObjectTree(function (instanceTree){
                //_viewer2D.modelstructure.setModel(instanceTree);
            //});
            //******/

            //maybe this method could help? 
             // viewer.layersPanel.setLayers();
           //or manipulate initLayersTexture ?
      });
}) ;


