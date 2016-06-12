module.exports = function(app)
{
    app.get("/api/meanblog/post", findAllPosts);
    app.post("/api/meanblog/post", createPost);
    app.delete("/api/meanblog/post/:id", removePost);

    //var connectionString = 'mongodb://127.0.0.1:27017/meanblogs';
    //
    //if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //        process.env.OPENSHIFT_APP_NAME;
    //}

    var mongoose = require("mongoose");
    //mongoose.createConnection(connectionString);

    var PostSchema = mongoose.Schema({
        title: String,
        body: String
    }, {collection: "meanblog"});

    var PostModel = mongoose.model("PostModel", PostSchema);
    var posts = [];

    function findAllPosts(req, res) {
        PostModel
            .find()
            .then(
                function(docs) {
                    posts = docs;
                    res.json(posts);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createPost(req, res) {
        var post = req.body;
        PostModel
            .create(post)
            .then(
                function(doc) {
                    posts.push(doc);
                    res.json(posts);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function removePost(req, res) {
        var id = req.params.id;
        PostModel
            .remove({_id: id})
            .then(
                function(stat) {
                    findAllPosts(req, res);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};