/**
 * Created by yangyang on 6/3/16.
 */
var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456"},
    {"_id": "432", "name": "Post 2", "websiteId": "456"},
    {"_id": "543", "name": "Post 3", "websiteId": "456"}
];

module.exports = function (app) {
    app.post('/api/webbuilder/website/:websiteId/page', createPage);
    app.get('/api/webbuilder/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/webbuilder/page/:pageId', findPageById);
    app.put('/api/webbuilder/page/:pageId', updatePage);
    app.delete('/api/webbuilder/page/:pageId', deletePage);

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        page._id = (new Date()).getTime() + "";
        page.websiteId = websiteId;
        pages.push(page);
        res.json(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var results = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                results.push(pages[i]);
            }
        }
        res.json(results);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.json(pages[i]);
                return;
            }
        }
        res.status(400).send("page " + pageId + " not found");
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i] = page;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("page " + pageId + " not found, cannot update");
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("page " + pageId + " cannot be removed");
    }
};