/**
 * Created by yangyang on 6/3/16.
 */
module.exports = function (app) {
    app.post('/api/webbuilder/page/:pageId/widget', createWidget);
    app.get('/api/webbuilder/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/webbuilder/widget/:widgetId', findWidgetById);
    app.put('/api/webbuilder/widget/:widgetId', updateWidget);
    app.delete('/api/webbuilder/widget/:widgetId', deleteWidget);

    function createWidget(req, res) {

    }

    function findAllWidgetsForPage(req, res) {

    }

    function findWidgetById(req, res) {

    }

    function updateWidget(req, res) {

    }

    function deleteWidget(req, res) {

    }
};