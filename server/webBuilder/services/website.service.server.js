/**
 * Created by yangyang on 6/3/16.
 */
module.exports = function (app) {
    app.post('/api/webbuilder/user/:userId/website', createWebsite);
    app.get('/api/webbuilder/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/webbuilder/website/:websiteId', findWebsiteById);
    app.put('/api/webbuilder/website/:websiteId', updateWebsite);
    app.delete('/api/webbuilder/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {

    }

    function findAllWebsitesForUser(req, res) {

    }

    function findWebsiteById(req, res) {

    }

    function updateWebsite(req, res) {

    }

    function deleteWebsite(req, res) {

    }
};