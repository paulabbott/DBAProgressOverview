var Bloom = require(global.app + '/bloom');
var async = require('async');
var User = require(`${global.models}/user`);
var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {

    //sets all alerts for this user of the given types to true
    markAllProgressAlertsAsViewed: Promise.coroutine(function*(req, callback) {
        try {
            //findOneAndUpdate didn't work so have to get the use model
            var currentUser = yield User.findById(req.user._id);
            //get the alerts from it
            var usersAlerts = currentUser._alerts;
            //set each alert for POINTS_GAINED and STARTS_GAINED to hasBeenViewed to true
            _.each(usersAlerts, function(alert) {
                if (_.includes(['POINTS_GAINED', 'STARS_GAINED'], alert._type)) {
                    alert._hasBeenViewed = true;
                }
            });
            //save this version of the user model 
            //(Q: does this include the new state of the alerts set above) pass by ref or by copy?
            var savedUser = yield currentUser.save();
            var userModel = _.omit(savedUser.toObject(), '_salt', '_hash');
            //passes the userModel back down to the client?
            callback(null, {_user: userModel})

        } catch (error) {
            if (!error._statusCode) {
                return callback({_statusCode: 500, message: error.message});
            }
            return callback(error);
        }
    })

}