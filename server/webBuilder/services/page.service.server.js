/**
 * Created by yangyang on 6/3/16.
 */

module.exports = function (app, modules) {
    var PageModel = modules.PageModel;

    app.post('/api/webbuilder/website/:websiteId/page', createPage);
    app.get('/api/webbuilder/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/webbuilder/page/:pageId', findPageById);
    app.put('/api/webbuilder/page/:pageId', updatePage);
    app.delete('/api/webbuilder/page/:pageId', deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        PageModel.createPage(websiteId, page)
            .then(
                function(page){
                    res.json(page);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        PageModel.findAllPagesForWebsite(websiteId)
            .then(
                function(pages){
                    res.json(pages);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        PageModel.findPageById(pageId)
            .then(
                function(page){
                    res.json(page);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        PageModel.updatePage(pageId, page)
            .then(
                function(stats){
                    res.json(stats);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        PageModel.deletePage(pageId)
            .then(
                function(stats){
                    res.json(stats);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }
};