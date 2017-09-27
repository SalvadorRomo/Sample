/**
 * UserMobile.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    connection: 'MysqlServer',
    migrate: 'safe',
    attributes: {


        username: {
            type: 'string',
             unique: 'true'
        },

        age: {
            type: 'integer',
            
        },

        password : {
        	type: 'string'
        },

        description: {
            type: 'string'
        },
        
        country: {
            type: 'string'
        },

        city: {
            type: 'string'
        },
        gender : {
        	 type: 'string'
        },
        
 
        toJSON : function(){
        	var obj = this.toObject(); 
        	delete obj.password;
        	return obj;
        }

    },
     beforeUpdate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    },

     beforeCreate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    }
};