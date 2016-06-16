/**
 * Created by yangyang on 6/3/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function (app, models) {

    var UserModel = models.UserModel;

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

    passport.use('local', new LocalStrategy(localStrategy));
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


    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user.username === username && user.password === password) {
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
        ;
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
                        return UserModel.createUser(req.body);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                    return;
                }
            ).then(
                function (user) {
                    if(user) {
                        //passport
                        req.login(user, function(err){
                            if(err) {
                                res.statusCode(400).send(err);
                            }else {
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