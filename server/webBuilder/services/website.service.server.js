/**
 * Created by yangyang on 6/3/16.
 */
var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456"},
    {"_id": "234", "name": "Tweeter", "developerId": "456"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
    {"_id": "678", "name": "Checkers", "developerId": "123"},
    {"_id": "789", "name": "Chess", "developerId": "234"}
];

module.exports = function (app) {
    app.post('/api/webbuilder/user/:userId/website', createWebsite);
    app.get('/api/webbuilder/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/webbuilder/website/:websiteId', findWebsiteById);
    app.put('/api/webbuilder/website/:websiteId', updateWebsite);
    app.delete('/api/webbuilder/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        website._id = (new Date()).getTime()+"";
        website.developerId = userId;
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var results = [];
        for(var i in websites) {
            if(websites[i].developerId === userId) {
                results.push(websites[i]);
            }
        }
        res.json(results);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                res.json(websites[i]);
                return;
            }
        }
        res.status(400).send("website not found");
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                websites[i] = website;
                res.sendStatus(200);
                return;
            }
        }
        res.status(400).send("website with ID: "+ websiteId +" not found, cannot be updated");
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return true;
            }
        }
        res.status(404).send("Unable to remove website with ID: " + websiteId);
    }
};