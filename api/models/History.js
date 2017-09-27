/**
 * History.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'MysqlServer',

	//migrate:'alter',

	//migrate:'alter',
	migrate:'alter',
//  migrate:'drop',

  attributes: {

    latitude: {
        type: 'string'
    },
    longitude: {
        type: 'string'
    },
    starthour: {
        type: 'datetime'// 'time'
    },
    endhour:{
        type: 'datetime'// 'time'
    },
  	promo :{
  	     type:'integer'
  	},

  	usermob : {
  	   type:'integer',
  	   via :  'id_history'
  	},
    device : {
        type: 'string'
    },

  }
};

