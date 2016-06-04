/**
 * Created by yangyang on 6/3/16.
 */
var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "yang", password: "yang", firstName: "yang", lastName: "yang"}
];

module.exports = function (app) {
    app.post('/api/webbuilder/user', createUser);
    app.get('/api/webbuilder/user', findUser);
    //app.get('/api/webbuilder/user?username=username', findUserByUsername);
    //app.get('/api/webbuilder/user?username=username&password=password', findUserByCredentials);
    app.get('/api/webbuilder/user/:userId', findUserById);
    app.put('/api/webbuilder/user/:userId', updateUser);
    app.delete('/api/webbuilder/user/:userId', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime()+"";
        users.push(user);
        res.json(user);
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
        for(var i in users) {
            if(users[i].username === username) {
                res.json(users[i]);
                return;
            }
        }
        res.status(400).send("username not found");
    }

    function findUserByCredentials(username, password, res) {
        for(var i in users) {
            if(users[i].username === username && users[i].password === password) {
                res.json(users[i]);
                return;
            }
        }
        res.status(401).send("username/password not correct");
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(users[i]._id === userId) {
                res.json(users[i]);
                return;
            }
        }
        res.status(400).send("userId not found");
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        for(var i in users) {
            if(users[i]._id === userId) {
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].email = user.email;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: "+ userId +" not found, cannot update");
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(users[i]._id === userId) {
                users.splice(i, 1);
            }
            res.send(200);
            return;
        }
        res.status(404).send("Unable to remove user with ID: " + userId);
    }

};