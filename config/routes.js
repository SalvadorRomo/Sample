/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    '/app':'PageController.app',
    '/download':'PageController.download',
    '/thanks':'PageController.thanks',



    /*************************************************************
     * JSON API                                                   *
     *************************************************************/
    'PUT /login': 'UserController.login',
    'GET /logout': 'UserController.logout',
    'POST /user/signup': 'UserController.signup',
    'POST /promotion/createPromotion': 'PromotionController.create',
    'POST /promotion/createImage': 'PromotionController.createImage',
    'POST /promotion/createAsset': 'PromotionController.createAsset',
    'GET /promotion/vuforia/eliminartodo':'PromotionController.eliminartodo',
    'GET /promotion/vuforia/eliminar/:id':'PromotionController.eliminarid',
    'POST /promotion/deleteOne':'PromotionController.delteOnlyPromo',
    'GET /promotion/vuforia/listado': 'PromotionController.listado',
    'POST /userMob/signup': 'UserMobileController.signup',
    'POST /userMob/signin': 'UserMobileController.singin',
    'POST /userMob/tokenisalive': 'UserMobileController.tokenisalive',//Agregado por Leonardo Oliva
    'GET /country' : 'StateController.stateExtractor', 
    'GET /citys/:id' : 'StateController.cityExtractor', 
    
    'POST /promo/:id'   :  'VuforiaController.userHistory',
    'POST /promotion/delete' : 'PromotionController.deletePromo',
    'GET /promo/:id'   :  'VuforiaController.userHistory',

    'GET /api/history/:id':'HistoryController.findOne',
    'PUT /api/history/:id':'HistoryController.update',

    'GET /api/user/promotion/:promoid':'UserController.userByPromotion',
    'GET /api/user': 'UserController.find',//Leonardo Oliva Monjarás
    'GET /api/user/:id': 'UserController.findOne',//Leonardo Oliva Monjarás
    //'GET /api/usercategory' : 'UserCategory.find',

    'GET /api/media': 'MediaController.find',//Leonardo Oliva Monjarás
    'GET /api/media/:id':'MediaController.findOne',//Leonardo Oliva Monjarás
    'POST /api/media':'MediaController.create',//Leonardo Oliva Monjarás
    'PUT /api/media/:id':'MediaController.update',//Leonardo Oliva Monjarás

    'GET /api/categories' : 'CategoriesController.find',//Leonardo Oliva Monjarás
    'GET /api/categories/:id':'CategoriesController.findOne',//Leonardo Oliva Monjarás
    'POST /api/categories':'CategoriesController.create',//Leonardo Oliva Monjarás
    'PUT /api/categories/:id': 'CategoriesController.update',//Leonardo Oliva Monjarás

    //Para la clasificación de usuario
    //'GET /api/usermobile/:id':'UserMobileController.findOne',//Leonardo Oliva Mojarás;Esta ruta es necesaria para llamarlo desde PYTHON para el CLUSTERING
    'GET /api/usermobile':'UserMobileController.find',//Leonardo Oliva Monjarás; Temporal;Remover
    'GET /api/usermobile/tag': 'UserMobileController.calculateTag',
    'GET /api/usermobile/tag/:id' : 'UserMobileController.calculateTagById',

     
     //Administración de los dashboard

    'GET /api/dashboard': 'Dashboard.find',//Leonardo Oliva Monjarás
    'GET /api/dashboard/:id':'Dashboard.findOne',//Leonardo Oliva Monjarás      
    'POST /api/dashboard':'Dashboard.create',//Leonardo Oliva Monjarás         
    'PUT /api/dashboard/:id': 'Dashboard.update',//Leonardo Oliva Monjarás     

    'GET /api/listado/url': 'Apis_graficasController.findUrl',//Leonardo Oliva Monjarás
    'GET /api/listado/config/url': 'Apis_graficasController.getConfigUrl',//Leonardo Oliva Monjarás
    'GET /api/listado': 'Apis_graficasController.find',//Leonardo Oliva Monjarás
    'GET /api/listado/:id':'Apis_graficasController.findOne',//Leonardo Oliva Monjarás      
    'POST /api/listado':'Apis_graficasController.create',//Leonardo Oliva Monjarás         
    'PUT /api/listado/:id': 'Apis_graficasController.update',//Leonardo Oliva Monjarás   
    
    //Acciones relacionadas con los graficos
    'GET /api/promotion/owner': 'PromotionController.getByOwner',
    'GET /api/automata/:xAxis/:yAxis/:owner/:men/:women' : 'AutomataController.consulta',
    'GET /api/automata' : 'AutomataController.consulta', //Manda los mismo parametro que la url de arriba pero sin formar el formato /../../
    'GET /api/extractdata/edad' : 'DataGraphicsContoller.Edad', // CREO QUE YA NO SE NECESITA




    //Machine Learning
    //clustering
    'GET /api/ml/clustering/kmeans' : 'MlClusteringKMeansController.getClusters',//Leonardo Oliva Monjarás
    //reponse se llama desde python
    //'GET /api/ml/clustering/kmeans/response' : 'MlClusteringKMeansResponseTempController.find',//Leonardo Oliva Monjarás
    //'GET /api/ml/clustering/kmeans/response/:id' : 'MlClusteringKMeansResponseTempController.findOne',//Leonardo Oliva Monjarás
    //'POST /api/ml/clustering/kmeans/response' : 'MlClusteringKMeansResponseTempController.create',//Leonardo Oliva Monjarás
    //'PUT /api/ml/clustering/kmeans/response/:id' : 'MlClusteringKMeansResponseTempController.update',//Leonardo Oliva Monjarás
    'PUT /api/ml/clustering/kmeans/response' : 'MlClusteringKMeansResponseTempController.update',//Leonardo Oliva Monjarás//Se utiliza desde python para mandar los datos desde paquetes
   
    //classification
    //Clasifica un usuario móvil en especifico
    'GET /api/ml/classification/naivebayes':'MlClassificationNaiveBayesController.getClassification',//Leonardo Oliva Monjarás
    //response desde python
    //'GET /api/ml/classification/naivebayes/response':'MlClassificationNaiveBayesResponseTempController.find',
    //'GET /api/ml/classification/naivebayes/response/:id':'MlClassificationNaiveBayesResponseTempController.findOne',
    'POST /api/ml/classification/naivebayes/response':'MlClassificationNaiveBayesResponseTempController.create',//Leonardo Oliva Monjarás
    //'PUT /api/ml/classification/naivebayes/response/:id':'MlClassificationNaiveBayesResponseTempController.update',
    'PUT /api/ml/classification/naivebayes/response':'MlClassificationNaiveBayesResponseTempController.update',//Leonardo Oliva Monjarás//Se utiliza desde python para mandar los datos desde paquetes



    //Relacionado con las notificaciones
    'POST /api/mobile/notification':'NotificationController.create',//Leonardo Oliva Monjarás//Solo para pruebas
    'POST /api/mobile/notification2':'NotificationController.generateNotificationToMovile',
    'GET /api/mobile/notification/getall':'NotificationController.find',//Leonardo Oliva Monjarás
    'GET /api/mobile/notification/:id':'NotificationController.findOne',//Leonardo Oliva Monjarás
    'PUT /api/mobile/notification/:id':'NotificationController.update',//Leonardo Oliva Monjarás


    //Apis para varias pruebas
    'GET /api/test/geocode':'TestController.geocode',//Para probar la generación del reverse desde un punto geografico

    'GET /api/test/intersection/withgeopoint/:usermobileID/:lat/:lon':'MlClassificationIntersectionController.calculateClassificationWithGeoPoint',
    'GET /api/test/intersection/withoutgeopoint':'MlClassificationIntersectionController.calculateClassificationWithoutGeoPoint',

    //Solo para ver los datos
    'GET /api/promotion':'PromotionController.find',
    'GET /api/promotion/:id':'PromotionController.findOne',




    /*************************************************************
     * Server-rendered HTML Pages                                *
     *************************************************************/
    'GET /': 'PageController.showHomePage',
    'GET /promotion': 'PageController.showPromotionPage',
    'GET /promotion/new':'PageController.createPromotionPage',
    'GET /signup'   : 'PageController.showSignupPage',
    'GET /signup'   : 'PageController.showSignupPage',
    'GET /gallery'  : 'PageController.showGallery',
    'GET /loginP'   : 'PageController.showLoginPage',
    'GET /imagesG' : 'PageController.showImages',
  /*************************************************************
     * Server-rendered HTML Pages Leo                            *
     *************************************************************/
    'GET /dashboardmanager': 'PageController.showDashboardManager', //Leonardo Oliva Monjarás
    'GET /dashboard/:Mode' : 'PageController.showDashboardEditor',//Leonardo Oliva Monjarás
    'GET /dashboard/:Mode/:HashDashboard' : 'PageController.showDashboardEditor',//Leonardo Oliva Monjarás


};