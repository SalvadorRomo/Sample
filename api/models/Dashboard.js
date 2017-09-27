/**
 * Dashboard.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 	connection: 'MysqlServer',
	//migrate:'drop',
     migrate: 'safe',
        attributes: {
          
            id_usuario: {
                type: "integer"
            },
            nombre: {
                type: "string"
            },
            descripcion: {
                type: "text"
            },
            cuerpo: {
                type: "text"
            },
            activo: {
                type: "boolean",
                 defaultsTo : 0
            },
            hash: {
                type: "string"
            }
        }
    
};




