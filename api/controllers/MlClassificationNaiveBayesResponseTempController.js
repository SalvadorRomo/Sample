/**
 * MlClassificationNaiveBayesResponseTempController
 *
 * @description :: Server-side logic for managing Mlclassificationnaivebayesresponsetemps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/*********
	Datos que se esperan de entrada:
	usermobile (id)  Usuario móvil del cual se creará la notificacion
	users: [] Lista de empresas a fin
	*********/
	create: function(req,res){

		if (req.param('users') === undefined) {
            return res.badRequest('A list of users is required (users:[])');
        }
        if(req.param('usermobile') == undefined){
        	return res.badRequest('An usermobile id is required (usermobile:0)');
        }

        var users = JSON.parse(req.param("users"))

        if(!(users instanceof Array)){
        	return res.serverError("users must be array");
        }
		if(users.length == 0){
			return res.serverError("The users array must contain one element at least");
		}

		NotificationService.createNotificationFromUsersId(//Utilizamos el servicio para crear la notificación
			{
				users:req.param("users"),
				usermobile:req.param('usermobile')

			},
			function(data){
				return res.ok(data);
			},
			function(data){
				return res.serverError("The process cannot be completed");
			}
		);

	}

};

