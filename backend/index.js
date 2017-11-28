var Bloom = require(global.app + '/bloom');

Bloom.registerPlugin('progressOverview', function(app, passport, io) {

    require('./routes')(app, passport, io);

});