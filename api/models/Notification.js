/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'MysqlServer',
	//migrate:'drop',
	migrate: 'safe',
  	attributes: {
  	    usermob : {
          type:'integer',
        },
        promo:{
        	model:'promotion'
        },
        watched:{
        	type: "boolean",
            defaultsTo : 0
        },
  	}
};

