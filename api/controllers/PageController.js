/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    showHomePage: function(req, res) {
        if (!req.session.userId) {
            return res.view('homepage', {
                me: null
            });
        }
        User.findOne(req.session.userId, function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            return res.view('homepage', {
                me: {
                    id: user.id,
                    email: user.email,
                    promo : null, 
                    dash : null
                }
            });
        });
    },

    showSignupPage: function(req, res) {
        if (req.session.userId) {
            return res.redirect('/');
        }

        return res.view('signup', {
            me: null
        });
    },


    showLoginPage: function(req, res) {
        if (req.session.userId) {
            return res.redirect('/');
        }

        return res.view('login', {
            me: null
            
        });
    },


    showPromotionPage: function(req,res){
            if (!req.session.userId) {
            return res.view('homepage', {
                me: null
                });
            }

            User.findOne({id: req.session.userId}).populate('promotions').exec(function(err,foundPromotions){
                if(err) 
                    return res.negotiate(err);
                //if(!promotion) return res.notFound();
                return res.view('promotion',{
                    me:{
                        'id': foundPromotions.id,
                        'email': foundPromotions.email,
                        'owner': foundPromotions,
                        promo : true
                    },
                    
                })
            })
    },

    createPromotionPage: function(req,res){
        if (!req.session.userId) {
            return res.view('homepage', {
                me: null
                });
            }

        User.findOne(req.session.userId, function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            return res.view('createPromotion', {
                me: {
                    id: user.id,
                    email: user.email,
                    promo : null, 
                    dash : null
                }
            });
        });



    },

    showGallery : function(req,res){

             if (!req.session.userId) {
            return res.view('homepage', {
                me: null
                });
            }

            User.findOne({id: req.session.userId}).populate('promotions').exec(function(err,foundPromotions){
                if(err) 
                    return res.negotiate(err);
                //if(!promotion) return res.notFound();
                console.log(foundPromotions);
                return res.view('gallery',{
                    me:{
                        'id': foundPromotions.id,
                        'email': foundPromotions.email,
                        'owner': foundPromotions,
                        promo:true

                    },
                    
                })
            })
    },

      showImages : function(req,res){

             if (!req.session.userId) {
            return res.view('homepage', {
                me: null
                });
            }

            User.findOne({id: req.session.userId}).populate('promotions').exec(function(err,foundPromotions){
                if(err) 
                    return res.negotiate(err);
                //if(!promotion) return res.notFound();
                console.log(foundPromotions);
                return res.view('galleryImages',{
                    me:{
                        'id': foundPromotions.id,
                        'email': foundPromotions.email,
                        'owner': foundPromotions,
                         promo:true

                    },
                    
                })
            })
    },
    /************
    Inicio - Controlar agregado por Leonardo Oliva
    *************/

    showDashboardManager: function(req, res){
        
        if (!req.session.userId) {
            return res.view('homepage', {
                me: null
            });
        }
        
        
         User.findOne(req.session.userId, function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            return res.view('dashboard/dashboardManagerView', {
                me: {
                    id: user.id,
                    email: user.email,
                    dash : true 
                }
            });
        });
    },



    /******************************
    :modo -> Que acccion se tomará con el dashboard {nuevo,modificar o visualizar}
    :hashDashboard -> A que dashboard se le aplicará la acción {modificar o visualizar}
    ******************************/
    showDashboardEditor: function(req, res){
        //Si no es un parametro valido redireccionar!
        if (  !(req.param('Mode').localeCompare('view') == 0  || req.param('Mode').localeCompare('new') == 0 || req.param('Mode').localeCompare('edit') == 0)  ) {
            return res.redirect('/dashboardmanager');
        }
        if (!req.session.userId) {
            return res.view('homepage', {
                me: null
            });
        }
        User.findOne(req.session.userId, function(err, user) {
            if (err) {
                return res.negotiate(err);
            }
            return res.view(
                //Si el modo es visualizar, cargamos la vista dashboardVisorView; caso contrario (Nuevo,Editar), dashboardEditor
                'dashboard/' + (req.param("Mode","new").localeCompare('view') == 0?'dashboardVisorView':'dashboardEditorView'), 
                {
                    layout:'dashboard/layout/dashboardEditorVisorFullScreenLayout',
                    me: {
                        id: user.id,
                        email: user.email
                    },
                    ModoApertura: req.param("Mode","new"),//Nuevo por defecto,
                    HashDashboard: req.param("HashDashboard",['0'])//Nuevo por defecto,
                }
            );
        });
    },

    /************
    Fin - Controlar agregado por Leonardo Oliva
    *************/

    app:function(req,res){

        return res.view(
            'app',{
                    me: {
                        id: 0,
                        email: ''
                    },
            }
        );

    },

    download:function(req,res){
         return res.download('assets/apk/1.txt');
        // res.redirect('thanks');
    },

     thanks:function(req,res){

        return res.view(
            'thanks',{
                    me: {
                        id: 0,
                        email: ''
                    },
            }
        );
    },
    


};