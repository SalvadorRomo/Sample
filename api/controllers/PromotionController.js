/**
 * PromotionController
 *
 * @description :: Server-side logic for managing promotions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * Changes by me
 */
var vuforia = require('vuforiajs');
        var client = vuforia.client({
            'accessKey': '03956911b10678123343071d72358d276714ea4d',
            'secretKey': '6a931c8e8663311ba6c4df8b96e1893f1eaace0d'
        });

module.exports = {

    create: function(req, res) {

        var util = vuforia.util();
        var dir_name;
        var dir_resource;

        var client = vuforia.client({
            'accessKey': '03956911b10678123343071d72358d276714ea4d',
            'secretKey': '6a931c8e8663311ba6c4df8b96e1893f1eaace0d'
        });

        var obj =
        {
            name        : req.param("name"),
            description : req.param("description"),
            start_date  : req.param("start_date"),
            end_date    : req.param("end_date"),
            media: req.param("media"),
            latitude: req.param("latitude"),
            longitude: req.param("longitude"),
            facebook: req.param("facebook"),
            twitter: req.param("twitter"),
            instagram: req.param("instagram"),
            youtube: req.param("youtube"),
            browser: req.param("browser"),
            categories:JSON.parse(req.param("categories","")),
            owner       : null
        };
        
        console.log(obj);
       
        User.findOne({
            id: req.session.userId
        }).exec(function(err, foundUser) {

            if (err) return res.negotiate;
            if (!foundUser) return res.notFound();
           
            obj.owner = foundUser.id;

            var exito = true;
            Promotion.create(obj)
                .exec(function(err, createdPromotion) {

                     if (err) return res.negotiate(err);
                              if(obj.categories !== undefined){
                                for(var i = 0; i < obj.categories.length;i++){
                                    PromotionCategory.create({promoId:createdPromotion.id,category:obj.categories[i].id})
                                        .exec(function(err,createadPC){                                         
                                                if(err){
                                                    console.log("Error al insertar la category " + element.id + "; para la promo: " +this.createdPromotion.id );
                                                    this.exito = false;
                                                    return res.negotiate(error);
                                                }
                                                console.log("Se ha insertado la realcion prom ocategoria");
                                                console.log(createadPC);
                                        });
                                    }
                          }     

                      var origifile = req.file('file')._files[0].stream.filename;                      
                      var asset = req.file('file');
                      
                        asset.upload({
                                dirname: require('path').resolve(sails.config.appPath + '/assets' + '/resources' + '/' + createdPromotion.owner + '/' + createdPromotion.id + '/image'),
                                saveAs : origifile
                            },

                            function(err, uploadedFiles) {
                               
                                if (err) return res.negotiate(err);
                                
                                var file = uploadedFiles[0];                               
                                var url = '/resources' + '/' + createdPromotion.owner + '/' + createdPromotion.id + '/image/' + file.filename;                                 
                                 var target = {

                                        'name': createdPromotion.name,
                                        'width': 32.0,
                                        'image': util.encodeFileBase64(file.fd),
                                        'active_flag': true,
                                        'application_metadata': util.encodeBase64(createdPromotion.id)
                                    };
                            
                              
                               client.addTarget(target, (err, result) => {           
                                      if (err) return res.negotiate(err);
                                      
                                        var trg = result.target_id;        
                                        Promotion.update({ id: createdPromotion.id }, { url_img_target: url, tokenVuforia : trg })
                                            .exec(function afterwards(err, updatedFiles) {            
                                                if (err) return res.negotiate(updatedFiles);
                                                var objProm = updatedFiles;     
                                                 return res.send(updatedFiles);                                        
                                     });

                                });
                          });
                    });
            });
    },

   

    createAsset: function(req, res) {

        Promotion.findOne({
            id: req.param('id')
        }).exec(function(err, promotionFounded) {
            if (err) return res.negotiate(err);
           
            var asset = req.file('file2');
            var origifile = req.file('file2')._files[0].stream.filename;             
            

            asset.upload({
                    dirname: require('path').resolve(sails.config.appPath + '/assets' + '/resources' + '/' + promotionFounded.owner + '/' + promotionFounded.id + '/asset'),
                    saveAs : origifile
                },
                function(err, uploadedFiles) {
                    if (err) return res.negotiate(err);
                    var file = uploadedFiles[0];
                    console.log(file);

                    var url = '/resources' + '/' + promotionFounded.owner + '/' + promotionFounded.id + '/asset/' + file.filename;


                    Promotion.update({ id: promotionFounded.id }, { url_img_asset: url }).exec(function afterwards(err, updatedFiles) {
                        if (err) return res.negotiate(err);

                        /*  */
                          return res.json(updatedFiles);

                    });
                });
        });

    },


    deletePromo : function (req,res) {

        var client = vuforia.client({
            'accessKey': '03956911b10678123343071d72358d276714ea4d',
            'secretKey': '6a931c8e8663311ba6c4df8b96e1893f1eaace0d'
        });

         Promotion.findOne({ id : req.param('id') }).exec(function(err, find){

            if(err) return res.negotiate(err); 

            client.deleteTarget(find.tokenVuforia , function (err,result){
                if(err) return res.negotiate(err); 

                    Promotion.destroy({id: find.id }).exec(function (err){
                        if(err) return res.negotiate(err); 

                            return res.ok();
                    }); 
                 });
           });
    },

    delteOnlyPromo : function(req, res){

           Promotion.destroy({name : req.param('params')}).exec(function (err){
                        
                        if(err) return res.negotiate(err); 

                            return res.ok();
                    }); 
    }, 

    getByOwner: function(req,res){
        if(req.param("owner") === undefined)
            return res.badRequest('owner is undefined');
        Promotion.find({owner:req.param("owner")}).exec(function(err,promotionFounded){
            if(err)
                return res.serverError("An error has ocurred when we tried to find promotion for the user ");
            return res.ok(promotionFounded);

        });
    },



    eliminartodo:function(req,res){
        client.listTargets(function (error, result) {
            if(error) return res.serverError("No se pudo obtener el listado:  " + error);
            console.log(result);

            for(var i = 0; i < result.results.length;i++){
                client.deleteTarget(result.results[i], function (error, result_) {
                    console.log("Eliminando: " + result_);
                    console.log(result_
                        );
                });
            }

            return res.ok(result);
        });   

    },

    eliminarid:function(req,res){
        client.deleteTarget(req.param("id"), function (error, result_) {
            if(error) return res.serverError("Se ha generado un error al intetnar eliminar la promo en vuforia")                    
                    console.log("Eliminando: " + result_);
                    console.log(result_);
            return res.ok(result_);
        });
    },

    
    listado:function(req,res){
        client.listTargets(function (error, result) {
            if(error) return res.serverError("No se pudo obtener el listado:  " + error);
            console.log(result);
            return res.ok(result);
        });       
    }





};