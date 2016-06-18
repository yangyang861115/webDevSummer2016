/**
 * Created by yangyang on 6/3/16.
 */

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, models) {

    var UserModel = models.UserModel;

    app.get('/auth/webbuilder/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/webbuilder/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/webBuilder/#/user',
            failureRedirect: '/assignment/webBuilder/#/login'
        }));

    app.post('/api/webbuilder/user', createUser);

    app.post('/api/webbuilder/login', passport.authenticate('local'), login); //safer to post
    app.post('/api/webbuilder/logout', logout);
    app.get('/api/webbuilder/loggedIn', loggedIn);
    app.post('/api/webbuilder/register', register);

    app.get('/api/webbuilder/user', findUser);
    //app.get('/api/webbuilder/user?username=username', findUserByUsername);
    //app.get('/api/webbuilder/user?username=username&password=password', findUserByCredentials);
    app.get('/api/webbuilder/user/:userId', findUserById);
    app.put('/api/webbuilder/user/:userId', updateUser);
    app.delete('/api/webbuilder/user/:userId', deleteUser);


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    passport.use('local', new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };
    console.log(facebookConfig.callbackURL);
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        var id = profile.id;

        UserModel.findUserByFacebookId(profile.id)
            .then(
                function (fbuser) {
                    if (fbuser) {
                        return done(null, fbuser);
                    } else {
                        var FBUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            token: token,
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        UserModel.createUser(FBUser)
                            .then(
                                function (user) {
                                    done(null, user);
                                }
                            );
                    }
                },
                function (error) {
                    return done(null, false);
                }
            );
    }


    function login(req, res) {
        var user = req.user; //passport add that to the req
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        UserModel.findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        //create a user return a promise
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return UserModel.createUser(req.body);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                    return;
                }
            ).then(
            function (user) {
                if (user) {
                    //passport
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            },
            function (err) {
            }
        );
    }

    function createUser(req, res) {
        var user = req.body;
        UserModel
            .createUser(user)
            .then(
                function (user) {
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(username, password, req, res);
        } else if (username) {
            findUserByUsername(username, res);
        }
    }

    function findUserByUsername(username, res) {
        UserModel.findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(404).send(error);
                }
            );
    }

    //function findUserByCredentials(username, password, req, res) {
    //    UserModel.findUserByCredentials(username, password)
    //        .then(
    //            function (user) {
    //                //req.session.currentUser = user;
    //                //console.log(req.session);
    //                res.json(user);
    //            },
    //            function (error) {
    //                res.statusCode(404).send(error);
    //            }
    //        );
    //}

    function findUserById(req, res) {
        var userId = req.params.userId;
        UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        UserModel.updateUser(userId, user)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        UserModel.deleteUser(userId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

};