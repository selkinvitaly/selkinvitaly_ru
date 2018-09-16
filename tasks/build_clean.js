const del         = require('del');
const notify      = require('gulp-notify');
const log         = require('fancy-log');
const colors      = require('ansi-colors');
const config      = require('config');
const PluginError = require('plugin-error');


module.exports = function(options) {
    const dest = config.get('gulp.tasks.clean.dest');

    return function() {
        return del(dest).then(paths => {
            if (paths.length) {
                log(`Deleted the output directory "${colors.magenta(dest)}"`);
            }

        }, err => {
            notify.onError({ title: 'Output directory hasn\'t deleted!' })
            throw new PluginError('del', err);
        });
    };

};
