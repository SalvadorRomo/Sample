/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');


module.exports = {
    signup: function(req, res) {

        if (_.isUndefined(req.param('email'))) {
            return res.badRequest('An email address is required!');
        }

        if (_.isUndefined(req.param('password'))) {
            return res.badRequest('A password is required!');
        }

        if(_.isUndefined(req.param('name'))){
            return res.badRequest('A username is required!');
        }

        if (req.param('password').length < 6) {
            return res.badRequest('Password must be at least 6 characters!');
        }

        if (_.isUndefined(req.param('username'))) {
            return res.badRequest('A username is required!');
        }

        // username must be at least 6 characters
        if (req.param('username').length < 6) {
            return res.badRequest('Username must be at least 6 characters!');
        }

        // Username must contain only numbers and letters.
        if (!_.isString(req.param('username')) || req.param('username').match(/[^a-z0-9]/i)) {
            return res.badRequest('Invalid username: must consist of numbers and letters only.');
        }

        Emailaddresses.validate({
            string: req.param('email'),
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                return res.serverError(err);
            },
            // The provided string is not an email address.
            invalid: function() {
                return res.badRequest('Doesn\'t look like an email address to me!');
            },
            // OK.
            success: function() {
                Passwords.encryptPassword({
                    password: req.param('password'),
                }).exec({

                    error: function(err) {
                        return res.serverError(err);
                    },

                    success: function(result) {

                        var options = {};

                        options.email = req.param('email');
                        options.username = req.param('username');
                        options.name = req.param('name'); 
                        options.encryptedPassword = result;

                        options.country = req.param('country',0);
                        options.state = req.param('state',0)
                        options.city = req.param('city',0);
                        options.streetNumber = req.param('streetNumber','11111');
                        options.streetName = req.param('streetName','cualquier dato');
                        options.postalCode = req.param('postalCode',45418);//Important!!

                        User.create(options).exec(function(err, createdUser) {
                            if (err) {
                                console.log('the error is: ', err.invalidAttributes);

                                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {

                                    // return res.send(409, 'Email address is already taken by another user, please try again.');
                                    return res.alreadyInUse(err);
                                }

                                if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique') {

                                    // return res.send(409, 'Username is already taken by another user, please try again.');
                                    return res.alreadyInUse(err);
                                }

                                return res.negotiate(err);
                            }

                            req.session.userId = createdUser.id;
                            return res.json(createdUser);
                        });
                    }
                });
            }
        });
    },

    login: function(req, res) {
        User.findOne({
            or: [
                { email: req.param('email') },
                { username: req.param('username') }
            ]
        }, function foundUser(err, createdUser) {
            if (err) return res.negotiate(err);
            if (!createdUser) return res.notFound();
            console.log(createdUser.encryptedPassword);
            Passwords.checkPassword({
                passwordAttempt: req.param('password'),
                encryptedPassword: createdUser.encryptedPassword
            }).exec({
                error: function(err) {
                    console.log(err);
                    return res.negotiate(err);
                },
                incorrect: function() {
                    return res.notFound();
                },
                success: function() {
                    req.session.userId = createdUser.id;
                    console.log(createdUser);
                    return res.ok();
                }
            });

        });
    },

    logout: function(req, res) {
        if (!req.session.userId) return res.redirect('/');
        User.findOne(req.session.userId, function foundUser(err, user) {
            if (err) return res.negotiate(err);

            req.session.userId = null;
            return res.redirect('/');
        });
    },



    userByPromotion:function(req,res){
        if(req.param("promoid") === undefined)
            return res.badRequest('promoid is undefined');
        var query = " SELECT * FROM prueba_usuarios.user " +
                    " INNER JOIN prueba_usuarios.promotion " +
                    " ON user.id = prueba_usuarios.promotion.owner " +
                    " WHERE promotion.id = ? "
                ;

        User.query(query,[req.param("promoid")],function(err,raw){
            if(err)
                return res.serverError("An error has ocurred when we tried to find user by promotion id");
            console.log(raw);
            return res.ok(raw);

        });

    }




};