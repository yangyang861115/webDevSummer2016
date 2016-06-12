/**
 * Created by yangyang on 6/11/16.
 */
module.exports = function (app) {
    var mongoose = require("mongoose");
    var TodoSchema = mongoose.Schema({
        priority: Number,
        title: String,
        todo: String
    }, {collection: "todo"});

    var Todo = mongoose.model("Todo", TodoSchema);

    //Todo.create({"priority": 4, "title": "CS1501", "todo": "sample 4"});
    //Todo.create({"priority": 5, "title": "CS1502", "todo": "sample 5"});
    //Todo.create({"priority": 6, "title": "CS1503", "todo": "sample 6"});

    app.get("/api/todo/todos", findAllTodos);
    app.put("/api/todo/todos", reorderTodos);


    function findAllTodos(req, res) {
        Todo.find()
            .then(function (todos) {
                res.json(todos);
            });
    }

    function reorderTodos(req, res) {
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        console.log("in the server" + [start, end]);
        //method 2 for not using promise
        Todo.find(function (err, todos) {
            todos.forEach(function (todo) {
                if (start > end) {
                    if (todo.priority - 1 >= end && todo.priority - 1 < start) {
                        todo.priority++;
                        todo.save(function () {
                        });
                    } else if (todo.priority - 1 === start) {
                        todo.priority = end + 1;
                        todo.save(function () {
                        });
                    }
                } else if (start < end) {
                    if (todo.priority - 1 > start && todo.priority - 1 <= end) {
                        todo.priority--;
                        todo.save(function () {
                        });
                    } else if (todo.priority - 1 === start) {
                        todo.priority = end + 1;
                        todo.save(function () {
                        });
                    }
                }
            });
            res.sendStatus(200);
        });


    }
};