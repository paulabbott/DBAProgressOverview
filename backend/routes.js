var Auth = require(global.app + '/middleware/authorization.js');
var Permissions = require(global.app + '/middleware/permissions.js');
var DefaultRouteResponse = require(global.app + '/helpers/query/defaultRouteResponse');
var Controller = require('./controller');

//set the api route for marking all progress alert viewed.
//the route is calle by the action
module.exports = function(app, passport, io) {
    app.put('/api/progressOverview/markAllProgressAlertsAsViewed', Auth.isAuthenticated, Permissions.isLearner, function(req, res) {
        //which then calls the function in the controller.
        Controller.markAllProgressAlertsAsViewed(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });
}