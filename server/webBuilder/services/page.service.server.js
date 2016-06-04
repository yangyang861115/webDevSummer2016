/**
 * Created by yangyang on 6/3/16.
 */
module.exports = function (app) {
    app.post('/api/webbuilder/website/:websiteId/page', createPage);
    app.get('/api/webbuilder/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/webbuilder/page/:pageId', findPageById);
    app.put('/api/webbuilder/page/:pageId', updatePage);
    app.delete('/api/webbuilder/page/:pageId', deletePage);

    function createPage(req, res) {

    }

    function findAllPagesForWebsite(req, res) {

    }

    function findPageById(req, res) {

    }

    function updatePage(req, res) {

    }

    function deletePage(req, res) {

    }
};