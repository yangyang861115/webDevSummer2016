/**
 * Created by yangyang on 7/16/16.
 */
module.exports = function(app)
{
    app.get("/api/coffee", findAllOrders);
    app.post("/api/coffee", createOrder);
    app.delete("/api/coffee/:id", deleteOrder);
    app.put("/api/coffee/:id", updateOrder);

    var mongoose = require("mongoose");

    var OrderSchema = mongoose.Schema({
        name: String,
        drink: String
    }, {collection: "coffee"});

    var OrderModel = mongoose.model("OrderModel", OrderSchema);

    function findAllOrders(req, res) {
        OrderModel
            .find()
            .then(
                function(orders) {
                    res.json(orders);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createOrder(req, res) {
        OrderModel
            .create(req.body)
            .then(
                function(newOrder) {
                    res.json(newOrder);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteOrder(req, res) {
        OrderModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateOrder(req, res) {
        var order = req.body;
        OrderModel
            .update(
                {_id: req.params.id},
                {$set: order}
            ).then(
                function(status) {
                    res.send(status);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};