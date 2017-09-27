/**
 * Promotion_userm__usermobile_promo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'MysqlServer',
  migrate:'safe',

	attributes: {
		id : {
			type:"integer",
			autoIncrement:true,
			primaryKey:true
		},
        promotion_userm: {
            type: 'integer',
            
        },

        usermobile_promo: {
            type: 'integer'
        },

         timesviews: {
            type: 'integer'
        },

         latitude: {
            type: 'float'
        },

         longitude: {
            type: 'float'
        },

         duration: {
            type: 'time'
        },

    }
};

