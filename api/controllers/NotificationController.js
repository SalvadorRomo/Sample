/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');
module.exports = {

	//Crear la api que dado un  ID de usuario movil obtenga el lista de X  cantidad de registros que no hallán sido enviados previament
	
	/************
	INPUT
	req.param("usermob")    ID del usuario movil [obligatorio]
	req.param("limite") 	Cuantos registros me trairi
	*************/

	generateNotificationToMovile: function (req, res) {


         var header = req.headers['authorization'];	
	     var token = header.substring(4); 
	      var data= CipherService.decode(token);	
	      var idUser = data.user.id;

		if ( idUser === undefined || idUser <= 0){
			return res.serverError("Ingrese un id de ususario movil (usermob) valido");
		}


		var query_ = " SELECT DISTINCT promo, id, usermob,  watched FROM prueba_usuarios.notification " +
					" WHERE usermob = ?  AND watched = 0 " +
					" GROUP BY promo " +
					" ORDER BY id ASC " +
					" limit ? "
				;

		//UserMobile.query(query_,[req.param("usermob"),req.param("limite",2)],function(err, notificationForUserMobile) {
		Notification.find().where({usermob:idUser,'watched':0}).limit(req.param("limit",1)).populate("promo").exec(function (err, notificationForUserMobile) {
			
			if(err) return res.serverError(err);
			if(!notificationForUserMobile) return res.serverError("No se han encontrado notificaciones");

			

			notificationForUserMobile.forEach(function(item,index,array){

				console.log("-----------");
				console.log("ITEM: ");
				console.log(item);
				console.log("-----------");
				
				Notification.update({id:item.id},{watched:1}).exec(function(err,updateNotification){
					if(err){
						console.log("Se ha generado un error al intentar actualizar la promoción, el watch 0" + item.id);
					}
					console.log(updateNotification);

				});
			});

			//console.log(notificationForUserMobile);

			return res.ok(notificationForUserMobile);

		});





	}


	
};

