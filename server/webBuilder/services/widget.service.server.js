/**
 * Created by yangyang on 6/3/16.
 */
var widgets = [
    {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../../public/assignment/webBuilder/uploads'});


    app.post('/api/webbuilder/page/:pageId/widget', createWidget);
    app.get('/api/webbuilder/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/webbuilder/widget/:widgetId', findWidgetById);
    app.put('/api/webbuilder/widget/:widgetId', updateWidget);
    app.put('/api/webbuilder/page/:pageId/widget', sortWidgets);
    app.delete('/api/webbuilder/widget/:widgetId', deleteWidget);
    app.post("/api/webbuilder/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var results = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                results.push(widgets[i]);
            }
        }
        res.json(results);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.status(400).send("Unable to find widget with id " + widgetId);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Unable to update widget with id " + widgetId);
    }

    function sortWidgets(req, res) {
        //need to change
        var pageId = req.params.pageId;
        var id1 = req.query['initial'];
        var id2 = req.query['final'];
        if (id1 && id2) {
            res.sendStatus(200);
            return;
        }
        res.status(400).send("Unable to sort");
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("Unable to delete widget with id " + widgetId);
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

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/assignment/webBuilder/uploads/" + filename;
                widgets[i].width = width;
            }
        }
        res.redirect("/assignment/webBuilder/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

};