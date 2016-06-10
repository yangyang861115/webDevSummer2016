/**
 * Created by yangyang on 6/3/16.
 */
module.exports = function (app, models) {

    var WebsiteModel = models.WebsiteModel;

    app.post('/api/webbuilder/user/:userId/website', createWebsite);
    app.get('/api/webbuilder/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/webbuilder/website/:websiteId', findWebsiteById);
    app.put('/api/webbuilder/website/:websiteId', updateWebsite);
    app.delete('/api/webbuilder/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        WebsiteModel.createWebsite(userId, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        WebsiteModel.findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel.findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        WebsiteModel.updateWebsite(websiteId, website)
            .then(
                function(stats){
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel.deleteWebsite(websiteId)
            .then(
                function (stats) {
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
};