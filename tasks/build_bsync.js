const config = require('config');


module.exports = function(options) {
    const server = options && options.sync;

    return function() {
        server.init(config.get('gulp.plugins.browserSync'));
    };
};
