/**
 * Apis_graficas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'MysqlServer',
	 migrate: 'safe',
	attributes: {
		id : {
			type:"integer",
			autoIncrement:true,
			primaryKey:true
		},
        url: {
            type: 'string',
            
        },
        configuration: {
            type: 'string'
        },
        active:{
        	type: "boolean",
            defaultsTo : 1
        },

    }
};

