/**
 * Created by yangyang on 6/3/16.
 */
module.exports = function (app, models) {

    var UserModel = models.UserModel;

    app.post('/api/webbuilder/user', createUser);
    app.get('/api/webbuilder/user', findUser);
    //app.get('/api/webbuilder/user?username=username', findUserByUsername);
    //app.get('/api/webbuilder/user?username=username&password=password', findUserByCredentials);
    app.get('/api/webbuilder/user/:userId', findUserById);
    app.put('/api/webbuilder/user/:userId', updateUser);
    app.delete('/api/webbuilder/user/:userId', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        UserModel
            .createUser(user)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findUser(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        }
    }

    function findUserByUsername(username, res) {
        UserModel.findUserByUsername(username)
            .then(
                function(user){
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        UserModel.findUserByCredentials(username, password)
            .then(
                function(user){
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        UserModel
            .findUserById(userId)
            .then(
                function(user){
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        UserModel.updateUser(userId, user)
            .then(
                function(stats){
                    res.send(stats);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        UserModel.deleteUser(userId)
            .then(
                function(stats){
                    res.send(stats);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

};