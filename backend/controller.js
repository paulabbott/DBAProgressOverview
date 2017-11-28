var Bloom = require(global.app + '/bloom');
var async = require('async');
var User = require(`${global.models}/user`);
var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {

    markAllProgressAlertsAsViewed: Promise.coroutine(function*(req, callback) {
        try {
            
            var currentUser = yield User.findById(req.user._id);

            var usersAlerts = currentUser._alerts;

            _.each(usersAlerts, function(alert) {
                if (_.includes(['POINTS_GAINED', 'STARS_GAINED'], alert._type)) {
                    alert._hasBeenViewed = true;
                }
            });

            var savedUser = yield currentUser.save();
            var userModel = _.omit(savedUser.toObject(), '_salt', '_hash');
            callback(null, {_user: userModel})

        } catch (error) {
            if (!error._statusCode) {
                return callback({_statusCode: 500, message: error.message});
            }
            return callback(error);
        }
    })

}