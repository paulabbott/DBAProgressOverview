var Auth = require(global.app + '/middleware/authorization.js');
var Permissions = require(global.app + '/middleware/permissions.js');
var DefaultRouteResponse = require(global.app + '/helpers/query/defaultRouteResponse');
var Controller = require('./controller');

module.exports = function(app, passport, io) {
    app.put('/api/progressOverview/markAllProgressAlertsAsViewed', Auth.isAuthenticated, Permissions.isLearner, function(req, res) {
        Controller.markAllProgressAlertsAsViewed(req, function(errObject, resObject) {
            DefaultRouteResponse(res, errObject, resObject);
        })
    });
}