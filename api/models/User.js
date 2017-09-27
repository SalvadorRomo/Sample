/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    
    connection: 'MysqlServer',
   // migrate:'drop',
    migrate: 'safe',
    //migrate: 'alter',

    
    attributes: {
        email: {
            type: 'string',
            email: 'true',
            unique: 'true'
        },

        username: {
            type: 'string',
            unique: 'true'
        },

        encryptedPassword: {
            type: 'string'
        },
        name:{
            type:"string"
        },
        description: {
            type: 'string'
        },

        //address: {
        //    type: 'string'
        //},
        //latitude: {
        //    type: 'string',
        //},
        //longitude: {
        //    type: 'string',
        //},
        country:{
            type:'integer',
        },
        state:{
            type:'integer',
        },
        city:{
            type:'integer',
        },
        streetNumber:{
            type: 'string',
        },
        streetName:{
            type: 'string',
        },
        postalCode:{
            type:'integer',
        },


        promotions: {
            collection: 'promotion',
            via: 'owner'
        },
        categories:{
            collection:'UserCategory',
            via:'owner'
        }
    }
};