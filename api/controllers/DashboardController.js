/**
 * DashboardController
 *
 * @description :: Server-side logic for managing Dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var SHA256 = require("sha256");

module.exports = {
    //Se modifica la inserción para generar el hash
    create: function(req, res) {
        if (_.isUndefined(req.param('id_usuario'))) {
            return res.badRequest('An id_usuario is required!');
        }

        if (_.isUndefined(req.param('nombre'))) {
            return res.badRequest('A nombre is required!');
        }
        Dashboard.create({
            id_usuario: req.param('id_usuario'),
            nombre: req.param('nombre'),
            descripcion: req.param('descripcion', ''),
            cuerpo: req.param('cuerpo', ''),
            activo: req.param('activo', 'true'),
            hash: SHA256(req.param('id_usuario') + req.param('nombre') + new Date().getTime())
        }).exec(function(err, dashboardCreated) {
            if (err) return res.serverError(err);
            return res.ok(dashboardCreated);
        });
    },

};