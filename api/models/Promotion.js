/**
 * Promotion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'MysqlServer',

    //migrate:'safe',
     //migrate: 'safe',

    migrate:'safe',
    // migrate: 'alter',



    attributes: {

        name: {
            type: 'string',
            unique: 'true'
        },
        description: {
            type: 'string',
        },
        state: {
            type: 'string'
        },
        url_img_asset: {
            type: 'string',
            unique: true
        },
        url_img_target: {
            type: 'string',
            unique: true
        },
        start_date: {
            type: 'date'
        },
        end_date: {
            type: 'date'
        },
        owner: {
            model: 'user',
        },
        media:{
            type : 'string'
        },


        categories:{
            collection:'PromotionCategory',
            via:'promoId'
        },
        
       /* id_category: {
           type: 'string',
        },*/

        tokenVuforia:{
            type : 'string'
        },


        latitude: {
            type: 'float',
        },
        longitude: {
            type: 'float',
        },

        facebook:{
            type:"string"
        },
        twitter:{
            type:"string"
        },
        instagram:{
            type:"string"
        },
        youtube:{
            type:"string"
        },
        video:{
            type:"string"
        },
        browser:{
            type:"string"
        },



        toJSON : function(){

            var obj = this.toObject(); 
            delete obj.owner;
            return obj;
        }
    }
};