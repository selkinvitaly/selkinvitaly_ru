const webpack = require('webpack');
const notify  = require('gulp-notify');
const config  = require('config');
const log     = require('fancy-log');
const colors  = require('ansi-colors');

const cfgWebpack = config.get('webpack');
const cfgPlugins = config.get('gulp.plugins');
const isWatch    = config.get('env.isWatch');


module.exports = function(options) {
    const bsync = options && options.sync;

    return function(done) {
        webpack(cfgWebpack, function(err, stats) {
            if (!err) {
                err = stats.toJson().errors[0];
            }

            if (err) {
                notify.onError({ title: 'JS task' });
                log(colors.red('[webpack]'));
                return log(err);
            }

            log('[webpack]', stats.toString(cfgPlugins.webpackOutput));

            if (isWatch) {
                bsync.reload('**/*.js')
            }

            done();
        });
    };

};
