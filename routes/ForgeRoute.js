var express =require ('express') ;

var router =express.Router () ;



router.get ('/get3DModelList', function (req, res) {
    res.send (offline_3D_models) ;
});
 


module.exports =router ;