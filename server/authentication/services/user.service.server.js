/**
 * Created by yangyang on 6/13/16.
 */
module.exports = function (app, models) {
    var UserModel = models.UserModel;

    app.post('/api/authentication/user', createUser);
    app.get('/api/authentication/user/:id', findUserById);
    app.get('/api/authentication/user', findUserByCredentials);
    app.put('/api/authentication/user/:id', updateUser);


    function createUser(req, res) {
        var user = req.body;
        user.roles = ["regular"];

        findUserByUsername(user.username, function (error, existUser) {
            console.log(error);
            console.log(existUser);
            if (existUser != null) {
                res.send(null);
            } else {
                UserModel
                    .createUser(user)
                    .then(
                        function (user) {
                            res.json(user);
                        },
                        function (error) {
                            res.statusCode(400).send(error);
                        });
            }
        });

    }

    function findUserByUsername(username, callback) {
        UserModel
            .findUserByUsername(username, callback);
    }


    function findUserById(req, res) {
        var id = req.params.id;
        UserModel
            .findUserById(id)
            .then(
                function (user) {
                    //delete user.password;
                    //user.password = "";
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        UserModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {

                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                });

    }

    function updateUser(req, res) {
        var user = req.body;
        var id = req.params.id;
        UserModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                });
    }
};


