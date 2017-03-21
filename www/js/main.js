var _viewer3D  = null;
var offline_3D_models = null;
var _curSel_3D = null;

var _toLoadModelIndex = -1;

var offline_models_svf_path = './offline-models';

var offline_3D_models =
    [
        {modelName:'3D-Model1',svfPath:offline_models_svf_path + '/bbff-3ef4-53d7-339d-e60a/Resource/3D_View/_3D_ 168550/_3D_.svf',viewModel:null},
        {modelName:'3D-Model2',svfPath:offline_models_svf_path + '/abe7-a695-9866-760f-ea51/Resource/3D_View/_3D_/_3D_.svf',viewModel:null},
      ];


//for selection changed event within aggregated models
function _aggregateSelectionChanged_3d(event){
 
    if(event.selections && event.selections.length){
        var selection = event.selections[0];
        var model = selection.model;
        _curSel_3D = selection;

        //get the properties of the corresponding object within this model
        _viewer3D.model = model;
        var nodeId = selection.dbIdArray[0];
         _viewer3D.getProperties(nodeId, function(result){
            if(result.properties){
                var propertyPanel = _viewer3D.getPropertyPanel(true);
                propertyPanel.setNodeProperties(nodeId);
                propertyPanel.setProperties(result.properties);
        }

        }); 

    }
} 

function _onGeometryLoaded(event)
{
    var viewer = event.target;
    viewer.removeEventListener(
         Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
        _onGeometryLoaded);


    offline_3D_models[_toLoadModelIndex].viewModel = event.model;


    //set the model tree with the structure of the activated model

    event.model.getObjectTree(function (instanceTree){
        _viewer3D.modelstructure.setModel(instanceTree);
        _viewer3D.model =  event.model;

        _viewer3D.impl.model =  event.model;
    });
    
}


function loadBaseViewerModel(svfPath,offModelIndex)
{
    var options = {
        path: svfPath,
        env: 'Local' 
     };

    Autodesk.Viewing.Initializer (options, function () {
        _viewer3D.initialize();
        var mat = new THREE.Matrix4();
        var loadOptions = {
            placementTransform:  mat,
            modelSpace:true
        };

        _toLoadModelIndex = 0;

        _viewer3D.loadModel(options.path,loadOptions);

         _viewer3D.addEventListener(
            Autodesk.Viewing.GEOMETRY_LOADED_EVENT, _onGeometryLoaded);

        _viewer3D.addEventListener(
                Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT, _aggregateSelectionChanged_3d);
        
    });
}


function loadViewerModel(svfPath,offModelIndex)
{
    var options = {
        path: svfPath,
        env: 'Local'
    };

    var mat = new THREE.Matrix4();

    //test1: translation
    var mat1 = new THREE.Matrix4();
    mat1.makeTranslation(50,50,0);

    //test2: rotate with X 
    //var mat2 = new THREE.Matrix4();
    //mat2.makeRotationX (90);

    //test3: rotate with X axis on the object
    var yawX = new THREE.Quaternion();
    var rotAxis = new THREE.Vector3(1,0,0);
    yawX.setFromAxisAngle(rotAxis, 90);
    var mat3 = new THREE.Matrix4();
    mat3.makeRotationFromQuaternion(yawX);

    //multiply the matrix
    mat.multiply(mat1);
    //mat.multiply(mat1).multiply(mat3);

    var loadOptions = {
        placementTransform:  mat,
        modelSpace:true
    };
    _viewer3D.loadModel(options.path,loadOptions);

    _toLoadModelIndex = offModelIndex;

      _viewer3D.addEventListener(
        Autodesk.Viewing.GEOMETRY_LOADED_EVENT, _onGeometryLoaded);

}



function unLoadViewModel(offModelIndex){

    _viewer3D.showAll();

   
    var theBindModel = offline_3D_models[offModelIndex].viewModel;
    _viewer3D.impl.unloadModel(theBindModel);
    offline_3D_models[offModelIndex].viewModel = null;

 
    //restore the tree of base model
    offline_3D_models[0].viewModel.getObjectTree(function (instanceTree){
        _viewer3D.modelstructure.setModel(instanceTree);
        _viewer3D.model =  offline_3D_models[0].viewModel;
         _viewer3D.impl.model =  offline_3D_models[0].viewModel;

    });

    

}

function transformModel(model)
{
    //translation
    var trans = new THREE.Vector3(100,100,0);  
    //rotate the object 
    var yawX = new THREE.Quaternion();
    var rotAxis = new THREE.Vector3(1,0,0);
    yawX.setFromAxisAngle(rotAxis, 90);
    
    var frags = model.getFragmentList();
    for(var k = 0;k<frags.fragments.fragId2dbId.length;k++){
             var fragProxy = _viewer3D.impl.getFragmentProxy(
                        model,
                        k);
            fragProxy.getAnimTransform()

            //translate 
            fragProxy.position =trans;

 
            //rotate
            fragProxy.quaternion._x = yawX.x
            fragProxy.quaternion._y = yawX.y
            fragProxy.quaternion._z = yawX.z
            fragProxy.quaternion._w = yawX.w

            fragProxy.updateAnimTransform()

    }
 
 
    _viewer3D.impl.invalidate(true);
   // _viewer3D.impl.sceneUpdated(true)



 
}

$(document).ready (function () {

    _viewer3D = new Autodesk.Viewing.Private.GuiViewer3D(
        document.getElementById('viewer3D'));
      
    loadBaseViewerModel(offline_3D_models[0].svfPath,0);

      
     $('#btnLoadSecond').click (function (evt) {
         loadViewerModel(offline_3D_models[1].svfPath,1);
      }) ;
 
     $('#btnUnloadSecond').click (function (evt) {
         unLoadViewModel(1);
    }) ;

    $('#btnTransform').click (function (evt) {
         transformModel(offline_3D_models[1].viewModel);
    }) ;
}) ; 

