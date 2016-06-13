/**
 * Created by yangyang on 6/3/16.
 */

module.exports = function (app, modules) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../../public/assignment/webBuilder/uploads'});

    var WidgetModel = modules.WidgetModel;

    app.post('/api/webbuilder/page/:pageId/widget', createWidget);
    app.get('/api/webbuilder/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/webbuilder/widget/:widgetId', findWidgetById);
    app.put('/api/webbuilder/widget/:widgetId', updateWidget);
    app.put('/api/webbuilder/page/:pageId/widget', reorderWidget);
    app.delete('/api/webbuilder/widget/:widgetId', deleteWidget);
    app.post("/api/webbuilder/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        WidgetModel.createWidget(pageId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        WidgetModel.findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        WidgetModel.findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        WidgetModel.updateWidget(widgetId, widget)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        WidgetModel.deleteWidget(widgetId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function reorderWidget(req, res) {
        //need to change
        var pageId = req.params.pageId;
        var start = req.query['start'];
        var end = req.query['end'];
        WidgetModel.reorderWidget(pageId, start, end)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;


        var url = "/assignment/webBuilder/uploads/" + filename;
        WidgetModel.uploadImage(widgetId, url, width)
            .then(function (stats) {
                   // res.send(stats);
                    res.redirect("/assignment/webBuilder/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                },
                function (error) {
                    res.statusCode(400).send(error);
                });

    }

};