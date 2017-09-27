/**
 * UserMobileController
 *
 * @description :: Server-side logic for managing usermobiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * ñlkñlkñlk,k
 */
 var passport = require('passport');

 function _onPassportAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);
 
  return res.ok({
    // TODO: replace with new type of cipher service
    token: CipherService.createToken(user),
    user: user
  });
}

module.exports = {

	 signup: function (req, res) {

    console.log(req.allParams());

    UserMobile
      .create(_.omit(req.allParams(), 'id'))
      .then(function (usermobile) {
        return {
          // TODO: replace with new type of cipher service
          token: CipherService.createToken(usermobile),
          usermobile: usermobile
        };
      })
      .then(res.createdtwo)
      .catch(res.serverError);
  },
	
	singin : function (req, res){
		passport.authenticate('local', 
      _onPassportAuth.bind(this, req, res))(req, res);
	},

  tokenisalive:function(req,res){
    var header = req.headers['authorization'];  
    var token = header.substring(4); 
    console.log("Token: " + token);
    var data = CipherService.decode(token); 
    console.log("Data: ");
    console.log(data);
    if(data == undefined || data == null){
      res.serverError({"status":false,"data":data});
    }
    res.ok({"status":true,"data":data});

  },

  calculateTagById: function(req,res){
      console.log("calculateTagById");
      console.log("calculateTagById");
      console.log("calculateTagById");
      console.log("calculateTagById");
      console.log("calculateTagById");
   
        var sql = " SELECT    DISTINCT categories.id, categories.name, count(*) as total "+
                  " FROM prueba_usuarios.history "+

                  " INNER JOIN prueba_usuarios.promotion "+
                  " ON prueba_usuarios.promotion.id = history.promo "+

                  " INNER JOIN prueba_usuarios.user "+
                  " ON user.id = promotion.owner "+

                  " INNER JOIN prueba_usuarios.usercategory "+
                  " ON usercategory.owner = user.id "+

                  " INNER JOIN prueba_usuarios.categories "+
                  " ON categories.id = usercategory.category "+

                  " WHERE history.usermob = ? "+
                  " GROUP BY categories.id "+
                  " ORDER BY total DESC "+

                  " limit 5  "
        ;
        History.query(sql,[req.param("id",0)],function(error,rawResult){
          if(error)
              return res.serverError("NO hay promociones");
          sails.log(rawResult);
          res.ok(rawResult);
        });
  },

  calculateTag: function(req,res){
   /*
        var sql = " SELECT    DISTINCT categories.id, categories.name, count(*) as total "+
                  " FROM prueba_usuarios.history "+

                  " INNER JOIN prueba_usuarios.promotion "+
                  " ON prueba_usuarios.promotion.id = history.promo "+

                  " INNER JOIN prueba_usuarios.user "+
                  " ON user.id = promotion.owner "+

                  " INNER JOIN prueba_usuarios.usercategory "+
                  " ON usercategory.owner = user.id "+

                  " INNER JOIN prueba_usuarios.categories "+
                  " ON categories.id = usercategory.category "+

                  " WHERE history.usermob = ? "+
                  " GROUP BY categories.id "+
                  " ORDER BY total DESC "+

                  " limit 5  "
        ;
        */
        console.log("calculateTag");
        console.log("calculateTag");
        console.log("calculateTag");
        console.log("calculateTag");
        console.log("calculateTag");
        console.log("calculateTag");
        console.log("calculateTag");
        console.log("calculateTag");

      var sql = 
              " SELECT    history.usermob, promotion.id as promoId, user.id as ownerId, usercategory.category as categoryID, categories.name as categoryName,  Count(*) as Total " +
              " FROM prueba_usuarios.history  " +

              " INNER JOIN prueba_usuarios.promotion " +
              " ON history.promo = promotion.id " +

              " INNER JOIN prueba_usuarios.user " +
              " ON promotion.owner = user.id " +

              " INNER JOIN prueba_usuarios.usercategory " +
              " ON user.id = usercategory.owner " +

              " INNER JOIN prueba_usuarios.categories " +
              " ON usercategory.category = categories.id " +

              " WHERE 1 = ? " +

              " GROUP BY usermob,categoryID " +
              " ORDER BY usermob, categoryID ASC "
              ;
      History.query(sql,[1],function(error,rawResult){
          if(error)
              return res.serverError("NO hay promociones");
          sails.log(rawResult);
          res.ok(rawResult);
        });
  },


};

